// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

// --- MUI Imports ---
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    if (error) setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginService(formData);
      console.log("Login successful!", data);

    if (data.token) {
  localStorage.setItem("token", data.token);
  login(data); // ✅ pass the whole response directly
  navigate("/");
} // navigate after login
      
    } catch (err) {
      console.error(err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.95))",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Welcome Back 👋
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                mb: 2,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.2,
                fontWeight: 600,
                background:
                  "linear-gradient(90deg, #6D28D9 0%, #9333EA 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #7E22CE 0%, #A855F7 100%)",
                },
              }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
