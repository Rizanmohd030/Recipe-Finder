import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

const panelSx = {
  p: { xs: 2, sm: 3, md: 4 },
  bgcolor: "#fffdf7",
};

const badgeSx = {
  display: "inline-flex",
  alignItems: "center",
  px: 1,
  py: 0.45,
  mb: 2.5,
  bgcolor: "secondary.main",
  color: "#ffffff",
  border: "2px solid #111111",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  maxWidth: "100%",
};

const AuthShell = ({ eyebrow, title, description, points = [], children }) => {
  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Paper sx={panelSx}>
            <Box sx={badgeSx}>{eyebrow}</Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "4.4rem" },
                lineHeight: { xs: 0.98, md: 0.92 },
                mb: 2,
                maxWidth: 520,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 560,
                color: "text.secondary",
                fontSize: { xs: "0.98rem", md: "1.05rem" },
                mb: 3,
              }}
            >
              {description}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: 1.5,
              }}
            >
              {points.map((point) => (
                <Paper key={point.title} sx={{ p: 2, bgcolor: "#ffffff" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {point.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                    {point.body}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ ...panelSx, bgcolor: "#ffffff" }}>
            <Box sx={{ width: "100%" }}>{children}</Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthShell;
