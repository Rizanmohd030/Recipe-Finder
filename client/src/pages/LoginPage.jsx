// src/pages/LoginPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/authContext";
import { API_BASE_URL } from "../services/apiBase";
import AuthShell from "../components/AuthShell";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch(`${API_BASE_URL || ""}/api/health`, { signal: controller.signal })
      .catch(() => {});

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    if (error) setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await loginService(formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
        login(data);
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="AI-POWERED ACCESS"
      title={
        <>
          Welcome
          <br />
          Back.
        </>
      }
      description="Log in to save favorites, keep your notes, and continue cooking from where you left off."
      points={[
        { title: "Saved", body: "Access your favorite recipes anytime." },
        { title: "Fast", body: "Get back into the app with a quick login." },
        { title: "Personal", body: "Keep notes tied to every favorite." },
      ]}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          color: "primary.main",
          letterSpacing: "-0.5px",
        }}
      >
        Log In
      </Typography>

      <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 3 }}>
        Please log in to continue
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          required
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            mt: 3,
            py: 1.4,
            fontWeight: 700,
            borderRadius: 2,
            background: "linear-gradient(90deg, #ff9800, #f57c00)",
            "&:hover": {
              background: "linear-gradient(90deg, #fb8c00, #ef6c00)",
            },
            fontSize: "1rem",
            letterSpacing: "0.5px",
          }}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </Box>
    </AuthShell>
  );
};

export default LoginPage;
