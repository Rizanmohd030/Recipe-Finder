import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe;

  return (
    <Card
      sx={{
        height: "100%",
        overflow: "hidden",
        bgcolor: "#fffdf7",
        "&:hover": {
          transform: "translate(4px, 4px)",
          boxShadow: "4px 4px 0 #111111",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/recipe/${idMeal}`}
        sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <CardMedia
          component="img"
          height="220"
          image={strMealThumb}
          alt={strMeal}
          loading="lazy"
          decoding="async"
          sx={{
            objectFit: "cover",
            width: "100%",
            borderBottom: "2px solid #111111",
          }}
        />

        <CardContent sx={{ width: "100%", p: 2.25 }}>
          <Box
            sx={{
              display: "inline-flex",
              px: 1,
              py: 0.4,
              mb: 1.5,
              bgcolor: "primary.main",
              color: "#ffffff",
              border: "2px solid #111111",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {strCategory || "Recipe"}
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              minHeight: 54,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {strMeal}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary", fontWeight: 500 }}>
            {strArea || "Cook this next"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
