// src/pages/RecipePage.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { AuthContext } from "../context/AuthContext";
import { addFavorite } from "../services/favoriteService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  Paper,
  Divider,
} from "@mui/material";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(recipeId);

        if (!data) {
          setError("Recipe not found.");
        } else {
          setRecipe(data);
        }
      } catch (err) {
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleSaveToFavorites = async () => {
    setFeedback({ message: "", type: "" });

    try {
      const res = await addFavorite(recipe.idMeal);
      setFeedback({ message: res.message || "Saved to favorites!", type: "success" });
    } catch (err) {
      setFeedback({ message: "Failed to save favorite.", type: "error" });
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }

  const getIngredients = () => {
    const out = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ing) out.push({ ing, measure });
    }
    return out;
  };

  return (
    <Box>

      {/* 🔥 HERO IMAGE SECTION */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 380 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(75%)",
          }}
        />

        {/* TITLE OVER IMAGE */}
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            bottom: 25,
            left: 25,
            color: "white",
            fontWeight: 900,
            textShadow: "0 4px 12px rgba(0,0,0,0.4)",
            maxWidth: "80%",
          }}
        >
          {recipe.strMeal}
        </Typography>
      </Box>

      {/* MAIN CONTAINER */}
      <Container maxWidth="md" sx={{ py: 5 }}>

        {/* CATEGORY TAG */}
        <Box
          sx={{
            background: "#fff7e6",
            borderLeft: "5px solid #ff9800",
            p: 2,
            mb: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#6d4c41" }}
          >
            Category: {recipe.strCategory} • Origin: {recipe.strArea}
          </Typography>
        </Box>

        {/* FAVORITE BUTTON */}
        {user && (
          <Button
            onClick={handleSaveToFavorites}
            size="large"
            sx={{
              mb: 3,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              color: "white",
              background: "linear-gradient(90deg, #ff9800, #f57c00)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(90deg, #fb8c00, #ef6c00)",
              },
            }}
          >
            ⭐ Save to Favorites
          </Button>
        )}

        {feedback.message && (
          <Alert severity={feedback.type} sx={{ mb: 3 }}>
            {feedback.message}
          </Alert>
        )}

        {/* INGREDIENTS */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }} elevation={1}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            🧂 Ingredients
          </Typography>

          <Grid container spacing={1}>
            {getIngredients().map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Typography sx={{ fontSize: "1rem", color: "#5d4037" }}>
                  • <strong>{item.ing}</strong> — {item.measure}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* INSTRUCTIONS */}
        <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            👨‍🍳 Instructions
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              whiteSpace: "pre-line",
              color: "#4e342e",
            }}
          >
            {recipe.strInstructions}
          </Typography>
        </Paper>

      </Container>
    </Box>
  );
};

export default RecipePage;
