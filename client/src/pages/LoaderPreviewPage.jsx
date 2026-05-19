import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import Loader from "../components/Loader";

const LoaderPreviewPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          mt: { xs: 4, md: 8 },
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 6 },
          bgcolor: "#fffdf7",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "1.75rem", sm: "2.2rem" }, mb: 1.5 }}
        >
          Loader Preview
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Burger layers assemble in sequence, then settle before looping.
        </Typography>

        <Box
          sx={{
            minHeight: 180,
            display: "grid",
            placeItems: "center",
            border: "2px solid #111111",
            bgcolor: "#ffffff",
          }}
        >
          <Loader />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoaderPreviewPage;
