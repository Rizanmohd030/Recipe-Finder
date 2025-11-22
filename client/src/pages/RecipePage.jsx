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
      if (ing) out.push(`${ing} — ${measure}`);
    }
    return out;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          mb: 5,
          color: "#f29b00",
          letterSpacing: "-0.5px",
        }}
      >
        {recipe.strMeal}
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT — Image */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              sx={{
                width: "100%",
                objectFit: "cover",
                height: 350,
              }}
            />
          </Paper>
        </Grid>

        {/* RIGHT — Content */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#555",
                fontWeight: 600,
                background: "#fff7ea",
                px: 2,
                py: 1,
                borderRadius: 2,
                display: "inline-block",
              }}
            >
              Category: {recipe.strCategory} • Area: {recipe.strArea}
            </Typography>

            {/* Favorite Button */}
            {user && (
              <Button
                onClick={handleSaveToFavorites}
                size="large"
                sx={{
                  width: "fit-content",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  backgroundColor: "#ff8c00",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#e57a00",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Save to Favorites ⭐
              </Button>
            )}

            {feedback.message && (
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            )}

            {/* Ingredients */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff3e0",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Ingredients
              </Typography>

              {getIngredients().map((ing, i) => (
                <Typography key={i} variant="body1" sx={{ mb: 0.5 }}>
                  • {ing}
                </Typography>
              ))}
            </Paper>

            {/* Instructions */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Instructions
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {recipe.strInstructions}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipePage;
