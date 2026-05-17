// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import { register as registerService } from "../services/authService";
import AuthShell from "../components/AuthShell";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    if (error) setError(null);
    if (success) setSuccess(null);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = await registerService(formData);
      console.log("Registration successful!", data);

      setSuccess("Account created successfully! You can now log in.");
      setFormData({ name: "", email: "", password: "" });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthShell
      eyebrow="JOIN RECIPEHUNT"
      title={
        <>
          Create your
          <br />
          account.
        </>
      }
      description="Register to save favorites, add notes, and use the same bold RecipeFinder interface across every page."
      points={[
        { title: "Save", body: "Keep your favorite meals in one place." },
        { title: "Note", body: "Write personal notes for every recipe." },
        { title: "Quick", body: "A simple account gets you started fast." },
      ]}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "primary.main",
          mb: 1,
          letterSpacing: "-0.5px",
        }}
      >
        Create Account
      </Typography>

      <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 3 }}>
        Start saving recipes and notes today
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          required
          margin="normal"
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <TextField
          fullWidth
          required
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <TextField
          fullWidth
          required
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            py: 1.4,
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: 2,
            textTransform: "none",
            background: "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #FF9800 0%, #F57C00 100%)",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </AuthShell>
  );
};

export default RegisterPage;
