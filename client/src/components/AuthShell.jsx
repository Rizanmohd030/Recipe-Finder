import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

const AuthShell = ({ eyebrow, title, description, points = [], children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 6 },
        background: "linear-gradient(180deg, #fffaf4 0%, #fff6eb 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: "1px solid rgba(255,145,0,0.18)",
              background: "linear-gradient(135deg, #fff7e8 0%, #fffdf8 100%)",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1.2,
                py: 0.4,
                mb: 3,
                bgcolor: "#ff5a00",
                color: "white",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                borderRadius: 0.5,
              }}
            >
              {eyebrow}
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                mb: 2,
                color: "#161616",
                fontSize: { xs: "2.4rem", md: "3.7rem" },
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 520,
                color: "#5f5f5f",
                lineHeight: 1.8,
                mb: 3,
                fontSize: { xs: "0.98rem", md: "1.02rem" },
              }}
            >
              {description}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              }}
            >
              {points.map((point) => (
                <Paper
                  key={point.title}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "white",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "primary.main",
                      fontWeight: 800,
                    }}
                  >
                    {point.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.8, color: "text.secondary" }}>
                    {point.body}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: "1px solid rgba(255,145,0,0.2)",
              background: "linear-gradient(135deg, #ffffff 0%, #fff8ef 100%)",
              boxShadow: "0 8px 30px rgba(255,145,0,0.12)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>{children}</Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthShell;
