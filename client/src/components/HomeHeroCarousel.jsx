import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

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
    <Paper sx={{ width: "100%", maxWidth: 430, bgcolor: "#ffffff", p: 1.5 }}>
      <Box sx={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", border: "2px solid #111111" }}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
          pt: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {slides[activeIndex].title}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.8 }}>
          {slides.map((slide, index) => (
            <Box
              key={slide.title}
              sx={{
                width: 12,
                height: 12,
                border: "2px solid #111111",
                bgcolor: index === activeIndex ? "secondary.main" : "#ffffff",
              }}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default HomeHeroCarousel;
