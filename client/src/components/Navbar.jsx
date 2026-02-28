// src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

import { AppBar, Toolbar, Box, Button, Typography, Container } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "primary.main",
              letterSpacing: "-0.5px",
            }}
          >
            RecipeHunt
          </Typography>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

            {user ? (
              <>
                <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                  Hi, {user.name} 👋
                </Typography>

                {/* Favorites */}
                <Button
                  component={Link}
                  to="/favorites"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark",
                      backgroundColor: "rgba(255,145,0,0.08)",
                    },
                  }}
                >
                  My Favorites
                </Button>

              

                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    background:
                      "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #FF9800 0%, #F57C00 100%)",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    color: "text.primary",
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    background:
                      "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #FF9800 0%, #F57C00 100%)",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
