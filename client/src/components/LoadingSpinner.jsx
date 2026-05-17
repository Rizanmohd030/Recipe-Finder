import React from "react";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Paper
        sx={{
          px: 4,
          py: 3,
          bgcolor: "#fffdf7",
          textAlign: "center",
          minWidth: 220,
        }}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2, fontWeight: 700 }}>Loading</Typography>
      </Paper>
    </Box>
  );
};

export default LoadingSpinner;
