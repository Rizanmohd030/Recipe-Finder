// src/pages/RecipePage.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { AuthContext } from "../context/AuthContext";
import { addFavorite } from "../services/favoriteService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent"; // ✅ NEW

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  Alert,
} from "@mui/material";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ NEW
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  // Fetch recipe details
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeById(recipeId);
        if (!data) {
          setError("Recipe not found.");
        } else {
          setRecipe(data);
        }
      } catch (err) {
        console.error("Failed to fetch recipe details:", err);
        setError("Failed to load this recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  // Add to favorites
  const handleSaveToFavorites = async () => {
    setFeedback({ message: "", type: "" });
    try {
      const response = await addFavorite(recipe.idMeal);
      setFeedback({
        message: response.message || "Saved to favorites!",
        type: "success",
      });
    } catch (err) {
      setFeedback({
        message: err.message || "Failed to save favorite.",
        type: "error",
      });
    }
  };

  // --- Loading State ---
  if (loading) return <LoadingSpinner />;

  // --- Centralized Error Display ---
  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }

  // Generate ingredient list
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
    }
    return ingredients;
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 700,
          background: "linear-gradient(90deg, #6D28D9, #9333EA)",
          backgroundClip: "text",
          textFillColor: "transparent",
          mb: 4,
        }}
      >
        {recipe.strMeal}
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Category: {recipe.strCategory} | Area: {recipe.strArea}
            </Typography>

            {user && (
              <Button
                variant="contained"
                size="large"
                onClick={handleSaveToFavorites}
                sx={{
                  width: "fit-content",
                  background: "linear-gradient(90deg, #6D28D9, #9333EA)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #7E22CE, #A855F7)",
                  },
                }}
              >
                Save to Favorites
              </Button>
            )}

            {feedback.message && (
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            )}

            <Box>
              <Typography variant="h5" gutterBottom>
                Ingredients
              </Typography>
              {getIngredients().map((ing, index) => (
                <Typography key={index} variant="body1" sx={{ lineHeight: 1.8 }}>
                  • {ing}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
                {recipe.strInstructions}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipePage;
