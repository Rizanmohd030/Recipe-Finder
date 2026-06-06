import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Typography, CircularProgress, Container, Paper, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import RecipeCard from "../components/RecipeCard";
import { API_BASE_URL } from "../services/apiBase";

export default function ScannerPage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const streamRef = useRef(null);

  const capturingRef = useRef(false);
  const isMountedRef = useRef(false);
  const startRequestRef = useRef(0);

  const stopCamera = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    const requestId = ++startRequestRef.current;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (!isMountedRef.current || requestId !== startRequestRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.muted = true;

        try {
          await videoRef.current.play();
        } catch (err) {
          if (err?.name !== "AbortError") {
            console.error("Camera play error:", err);
          }
        }
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    startCamera();

    return () => {
      isMountedRef.current = false;
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const capturePhoto = async () => {
    if (capturingRef.current) return;
    capturingRef.current = true;

    try {
      if (!videoRef.current || !videoRef.current.videoWidth || !videoRef.current.videoHeight) {
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0);

      const base64 = canvas.toDataURL("image/jpeg");
      setImagePreview(base64);

      await processImage(base64);
    } finally {
      capturingRef.current = false;
    }
  };

  const handleUpload = (e) => {
    if (capturingRef.current) return;
    capturingRef.current = true;

    const file = e.target.files?.[0];
    if (!file) {
      capturingRef.current = false;
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setImagePreview(reader.result);
        await processImage(reader.result);
      } finally {
        capturingRef.current = false;
      }
    };
    reader.onerror = () => {
      capturingRef.current = false;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleReset = () => {
    setImagePreview(null);
    setResult(null);
    setRecipes([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const processImage = async (base64) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/vision/identify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      setResult(data.foodName);
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error("Process error:", err);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#fffdf7" }}>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.95rem", sm: "2.2rem", md: "3.6rem" } }}>
          Scan Food
        </Typography>
        <Typography variant="body1" sx={{ mt: 1.5, color: "text.secondary", maxWidth: 620 }}>
          Use your camera or upload a photo. The scanner keeps the same sharp, flat UI as the
          rest of the app.
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Paper sx={{ p: { xs: 1.25, sm: 2 }, bgcolor: "#ffffff" }}>
            <Box
              component="video"
              ref={videoRef}
              autoPlay
              playsInline
              muted
              sx={{
                width: "100%",
                aspectRatio: "4 / 3",
                objectFit: "cover",
                border: "2px solid #111111",
                bgcolor: "#111111",
                display: imagePreview ? "none" : "block",
              }}
            />
            {imagePreview && (
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Captured food preview"
                  sx={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    objectFit: "cover",
                    border: "2px solid #111111",
                    display: "block",
                  }}
                />
                <IconButton
                  onClick={handleReset}
                  size="small"
                  aria-label="Refresh"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    color: "black",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#ffffff", boxShadow: "none" }}>
            <Typography variant="h5">Capture or Upload</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Keep your food centered, then submit it for recipe matches.
            </Typography>

            <Box sx={{ display: "grid", gap: 1.25, mt: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={capturePhoto}
                sx={{ fontSize: { xs: "0.88rem", sm: "1rem" } }}
              >
                Capture From Camera
              </Button>

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleUpload}
                style={{ display: "none" }}
              />

              <Button
                variant="outlined"
                color="primary"
                onClick={() => inputRef.current?.click()}
                sx={{ fontSize: { xs: "0.88rem", sm: "1rem" } }}
              >
                Upload Photo
              </Button>
            </Box>

            {loading && (
              <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <CircularProgress size={28} color="primary" />
                <Typography sx={{ fontWeight: 700 }}>Processing...</Typography>
              </Box>
            )}

            {result && (
              <Paper sx={{ p: { xs: 1.5, sm: 2 }, mt: 3, bgcolor: "#f3efeb", boxShadow: "none" }}>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                  Detected Dish
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.6 }}>
                  {result}
                </Typography>
              </Paper>
            )}
          </Paper>
        </Box>

        {recipes.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Matching Recipes
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                gap: { xs: 2, md: 3 },
              }}
            >
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
