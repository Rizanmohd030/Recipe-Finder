import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Container maxWidth="lg" sx={{ pb: { xs: 3, md: 4 } }}>
      <Box
        component="footer"
        sx={{
          mt: "auto",
          px: { xs: 2, md: 3 },
          py: 2,
          bgcolor: "#ffffff",
          border: "2px solid #111111",
          boxShadow: "8px 8px 0 #111111",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          © {new Date().getFullYear()} RecipeFinder by{" "}
          <Box
            component="a"
            href="https://rizanmi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "secondary.main", fontWeight: 700 }}
          >
            Rizan Mohammed Ismail
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
