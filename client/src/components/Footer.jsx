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
        bgcolor: "background.paper",
        borderTop: "1px solid rgba(0,0,0,0.06)",
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
        <span style={{ color: "#FF8E0A", fontWeight: 600 }}>
          <a
            href="https://www.linkedin.com/in/rizan-mohammed-ismail-b059b7269/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FF8E0A",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Rizan Mohammed Ismail
          </a>
        </span>
      </Typography>
    </Box>
  );
};

export default Footer;
