import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack as MuiStack } from "@mui/material";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=1200&q=80",
    alt: "Fresh pasta bowl",
    title: "Fresh Pasta",
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    alt: "Colorful breakfast bowl",
    title: "Healthy Bowls",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    alt: "Dessert plating",
    title: "Sweet Desserts",
  },
];

const HomeHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "transparent",
        boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "4 / 5", bgcolor: "#141414" }}>
        {slides.map((slide, index) => (
          <Box
            key={slide.title}
            component="img"
            src={slide.src}
            alt={slide.alt}
            loading={index === activeIndex ? "eager" : "lazy"}
            decoding="async"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === activeIndex ? 1 : 0,
              transition: "opacity 700ms ease",
            }}
          />
        ))}
      </Box>

      <MuiStack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: "#1e1e1e",
          color: "white",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {slides[activeIndex].title}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.8 }}>
          {slides.map((slide, index) => (
            <Box
              key={slide.title}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: index === activeIndex ? "primary.main" : "rgba(255,255,255,0.35)",
                transition: "background-color 200ms ease",
              }}
            />
          ))}
        </Box>
      </MuiStack>
    </Paper>
  );
};

export default HomeHeroCarousel;
