import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Loader from "./Loader";

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
        <Loader />
        <Typography sx={{ mt: 2, fontWeight: 700 }}>Loading</Typography>
      </Paper>
    </Box>
  );
};

export default LoadingSpinner;
