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
        bgcolor: "#fffaf4",
        borderBottom: "1px solid rgba(255,145,0,0.14)",
        boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            minHeight: 72,
          }}
        >

          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "#161616",
              letterSpacing: "-0.5px",
              whiteSpace: "nowrap",
            }}
          >
            Recipe<Box component="span" sx={{ color: "primary.main" }}>Hunt</Box>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "text.primary",
                borderRadius: 999,
                px: 2,
              }}
            >
              Discover
            </Button>
            <Button
              component={Link}
              to="/scan"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "text.primary",
                borderRadius: 999,
                px: 2,
              }}
            >
              Scanner
            </Button>
            {user && (
              <Button
                component={Link}
                to="/favorites"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  color: "text.primary",
                  borderRadius: 999,
                  px: 2,
                }}
              >
                Collections
              </Button>
            )}
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexShrink: 0 }}>

            {user ? (
              <>
                <Typography sx={{ color: "text.secondary", fontWeight: 600, display: { xs: "none", sm: "block" } }}>
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
                    borderRadius: 999,
                    borderColor: "rgba(255,145,0,0.35)",
                    color: "primary.main",
                    bgcolor: "rgba(255,145,0,0.06)",
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "rgba(255,145,0,0.12)",
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
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #ff9800, #f57c00)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #fb8c00, #ef6c00)",
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
                    borderRadius: 999,
                    color: "text.primary",
                    px: 2,
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
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #ff9800, #f57c00)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #fb8c00, #ef6c00)",
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
