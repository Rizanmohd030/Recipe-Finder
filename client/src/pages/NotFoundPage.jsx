import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ p: { xs: 3, md: 5 }, textAlign: "center", bgcolor: "#fffdf7" }}>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "4rem", md: "6rem" }, color: "primary.main" }}
        >
          404
        </Typography>
        <Typography variant="h3" sx={{ mt: 1 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
          The page you opened does not exist or has moved.
        </Typography>

        <Button variant="contained" color="secondary" component={RouterLink} to="/" size="large">
          Go Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
