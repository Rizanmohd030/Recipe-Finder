// src/components/Footer.jsx

import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        textAlign: "center",
        bgcolor: "#fffaf4",
        borderTop: "1px solid rgba(255,145,0,0.14)",
        boxShadow: "0 -4px 18px rgba(0,0,0,0.04)",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontSize: "0.95rem",
        }}
      >
        © {new Date().getFullYear()} RecipeHunt — Built by{" "}
        <a
          href="https://rizanmi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#FF8E0A",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Rizan Mohammed Ismail
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
