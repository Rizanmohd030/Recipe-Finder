import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
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
        videoRef.current.setAttribute("playsinline", true); // iPhone fix
        videoRef.current.muted = true; // mobile autoplay fix

        try {
          await videoRef.current.play();
        } catch (err) {
          // This can happen during rapid remount/reload in React strict mode.
          if (err?.name !== "AbortError") {
            console.error("Camera play error:", err);
          }
        }
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  }, []);

  // Start camera on mount
  useEffect(() => {
    isMountedRef.current = true;
    startCamera();

    return () => {
      isMountedRef.current = false;
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // CAPTURE PHOTO
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

  // UPLOAD PHOTO
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

  // SEND TO BACKEND
  const processImage = async (base64) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/vision/identify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        }
      );

      const data = await res.json();
      console.log("Detected Food:", data);

      setResult(data.foodName);
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error("Process error:", err);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ pt: 4, px: 2, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Scan Food
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {/* Live Camera Preview */}
        {!imagePreview && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "90%",
              maxWidth: "400px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              background: "black",
            }}
          />
        )}

        {/* Photo Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Captured food preview"
            style={{
              width: "90%",
              maxWidth: "400px",
              borderRadius: "12px",
              marginBottom: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
        )}

        {/* Buttons */}
        <Box
          sx={{
            width: "90%",
            maxWidth: "400px",
            mt: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={capturePhoto}
            sx={{
              width: "100%",
              py: 1,
              fontWeight: 700,
              borderRadius: 2,
              background: "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
            }}
          >
            Capture from Camera
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
            onClick={() => inputRef.current.click()}
            sx={{
              width: "100%",
              py: 1,
              fontWeight: 700,
              borderRadius: 2,
            }}
          >
            Upload a Photo Instead
          </Button>
        </Box>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ mt: 3 }}>
          <CircularProgress size={40} />
          <Typography sx={{ mt: 1 }}>Processing...</Typography>
        </Box>
      )}

      {/* Detected Food */}
      {result && (
        <Typography sx={{ mt: 3, fontSize: "1.2rem", fontWeight: 600 }}>
          Detected: {result}
        </Typography>
      )}

      {/* Recipes */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </Box>
    </Box>
  );
}
