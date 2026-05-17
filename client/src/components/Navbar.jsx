import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { AppBar, Toolbar, Box, Button, Typography, Container } from "@mui/material";

const navButtonSx = (active) => ({
  minWidth: 0,
  px: { xs: 1.15, sm: 1.5, md: 2 },
  py: { xs: 0.8, sm: 1 },
  border: "2px solid #111111",
  bgcolor: active ? "#ff5b1f" : "#ffffff",
  color: active ? "#ffffff" : "#111111",
  fontSize: { xs: "0.8rem", sm: "0.95rem", md: "1rem" },
  lineHeight: 1,
  "&:hover": {
    backgroundColor: "#d94811",
    color: "#ffffff",
    transform: "translate(2px, 2px)",
  },
});

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        color: "text.primary",
        border: "none",
        boxShadow: "none",
        pt: { xs: 1.5, md: 2 },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "auto",
            px: { xs: 1.25, sm: 2, md: 3 },
            py: { xs: 1.25, sm: 2 },
            boxShadow: "8px 8px 0 #111111",
            bgcolor: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: { xs: 1.25, sm: 2 },
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              fontSize: { xs: "1.15rem", sm: "1.5rem", md: "1.8rem" },
              fontWeight: 700,
              letterSpacing: "-0.06em",
            }}
          >
            Recipe
            <Box component="span" sx={{ color: "secondary.main" }}>
              Hunt
            </Box>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "flex-end" },
              gap: { xs: 0.75, sm: 1 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Button component={Link} to="/" sx={navButtonSx(location.pathname === "/")}>
              Home
            </Button>
            <Button component={Link} to="/scan" sx={navButtonSx(location.pathname === "/scan")}>
              Scan
            </Button>

            {user && (
              <Button
                component={Link}
                to="/favorites"
                sx={navButtonSx(location.pathname === "/favorites")}
              >
                Favorites
              </Button>
            )}

            {user ? (
              <>
                <Typography
                  sx={{
                    px: 0.5,
                    fontSize: { xs: "0.78rem", sm: "0.9rem", md: "1rem" },
                    fontWeight: 500,
                    display: "block",
                    maxWidth: { xs: 120, sm: 180, md: "none" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                 Welcome  <strong>{user.name} </strong> !
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={navButtonSx(location.pathname === "/login")}
                >
                  Login
                </Button>
                <Button component={Link} to="/register" variant="contained" color="secondary">
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
