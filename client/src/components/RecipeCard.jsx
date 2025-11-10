// src/components/RecipeCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

/**
 * RecipeCard component - modern MUI version.
 * Displays a recipe thumbnail and title as a clickable card.
 */
const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb } = recipe;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/recipe/${idMeal}`}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={strMealThumb}
          alt={strMeal}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            width: "100%",
            textAlign: "center",
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
