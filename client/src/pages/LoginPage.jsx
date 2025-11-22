// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

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

    try {
      const data = await loginService(formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
        login(data);
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          px: 5,
          py: 6,
          borderRadius: 4,
          width: "100%",
          background: "linear-gradient(135deg, #ffffff 0%, #fff6e5 100%)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.06), 0 4px 15px rgba(0,0,0,0.03)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "primary.main",
            letterSpacing: "-0.5px",
          }}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary", mb: 4 }}
        >
          Please log in to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>

          {/* Email */}
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

          {/* Password */}
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

          {/* Login Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 600,
              borderRadius: 2,
              background: "linear-gradient(90deg, #ff9800, #f57c00)",
              "&:hover": {
                background: "linear-gradient(90deg, #fb8c00, #ef6c00)",
              },
              fontSize: "1rem",
              letterSpacing: "0.5px",
            }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
