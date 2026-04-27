
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


const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb } = recipe;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "background.paper",
        boxShadow: "0 6px 18px rgba(16, 24, 40, 0.06)",
        transition:
          "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 36px rgba(16,24,40,0.10)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/recipe/${idMeal}`}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* IMAGE */}
        <CardMedia
          component="img"
          height="200"
          image={strMealThumb}
          alt={strMeal}
          loading="lazy"
          decoding="async"
          sx={{
            objectFit: "cover",
            width: "100%",
          }}
        />

        {/* CONTENT */}
        <CardContent
          sx={{
            width: "100%",
            textAlign: "center",
            py: 2.5,
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1.05rem",
              color: "text.primary",
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
