import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { useAuth } from "../context/authContext";
import { addFavorite } from "../services/favoriteService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Alert,
  Paper,
  Divider,
} from "@mui/material";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
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
      } catch {
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
    } catch {
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
    <Container maxWidth="lg">
      <Paper sx={{ overflow: "hidden", bgcolor: "#fffdf7" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
          }}
        >
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Box
              sx={{
                display: "inline-flex",
                px: 1,
                py: 0.45,
                mb: 2,
                bgcolor: "secondary.main",
                color: "#ffffff",
                border: "2px solid #111111",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {recipe.strCategory} / {recipe.strArea}
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4.2rem" },
                lineHeight: 0.92,
                maxWidth: 520,
              }}
            >
              {recipe.strMeal}
            </Typography>

            {user && (
              <Button
                onClick={handleSaveToFavorites}
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
              >
                Save to Favorites
              </Button>
            )}

            {feedback.message && (
              <Alert severity={feedback.type} sx={{ mt: 3 }}>
                {feedback.message}
              </Alert>
            )}
          </Box>

          <Box
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              width: "100%",
              height: "100%",
              minHeight: { xs: 280, md: 420 },
              objectFit: "cover",
              borderLeft: { md: "2px solid #111111" },
              borderTop: { xs: "2px solid #111111", md: "none" },
            }}
          />
        </Box>

        <Divider />

        <Box
          sx={{
            p: { xs: 3, md: 4 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3, bgcolor: "#ffffff" }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Ingredients
            </Typography>

            <Grid container spacing={1.2}>
              {getIngredients().map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.ing}
                    <Box component="span" sx={{ color: "text.secondary" }}>
                      {" "}
                      - {item.measure}
                    </Box>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, bgcolor: "#ffffff" }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Instructions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                color: "text.primary",
              }}
            >
              {recipe.strInstructions}
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default RecipePage;
