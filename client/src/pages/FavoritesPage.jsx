// src/pages/FavoritesPage.jsx

import React, { useState, useEffect } from "react";
import { getFavorites, removeFavorite, updateFavoriteNotes } from "../services/favoriteService";
import { getRecipeById } from "../services/recipeService";

import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import NotesEditModal from "../components/NotesEditModal";

import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Skeleton,
} from "@mui/material";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchAndMergeFavorites = async () => {
      try {
        setLoading(true);
        const favoriteList = await getFavorites();

        if (!favoriteList.length) {
          setFavoriteRecipes([]);
          setLoading(false);
          return;
        }

        const initial = favoriteList.map((fav) => ({
          idMeal: fav.recipeId,
          strMeal: `Recipe ${fav.recipeId}`,
          notes: fav.notes || "",
          isLoading: true,
        }));

        setFavoriteRecipes(initial);
        setLoading(false);

        favoriteList.forEach((fav) => {
          getRecipeById(fav.recipeId)
            .then((recipe) => {
              setFavoriteRecipes((prev) =>
                prev.map((item) =>
                  item.idMeal === fav.recipeId
                    ? {
                        ...item,
                        ...(recipe || {}),
                        notes: fav.notes || "",
                        isLoading: false,
                        missing: !recipe,
                      }
                    : item
                )
              );
            })
            .catch(() => {
              setFavoriteRecipes((prev) =>
                prev.map((item) =>
                  item.idMeal === fav.recipeId
                    ? { ...item, isLoading: false, missing: true }
                    : item
                )
              );
            });
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load favorites. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeFavorites();
  }, []);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFavorite(recipeId);
      setFavoriteRecipes((prev) =>
        prev.filter((item) => item.idMeal !== recipeId)
      );
    } catch {
      alert("Could not remove favorite.");
    }
  };

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleSaveNotes = async (recipeId, newNotes) => {
    try {
      await updateFavoriteNotes(recipeId, newNotes);
      setFavoriteRecipes((prev) =>
        prev.map((r) =>
          r.idMeal === recipeId ? { ...r, notes: newNotes } : r
        )
      );
      handleCloseModal();
    } catch {
      alert("Could not save notes. Try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container sx={{ py: 6 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "primary.main",
            letterSpacing: "-0.5px",
          }}
        >
          My Favorite Recipes
        </Typography>

        {favoriteRecipes.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 6, color: "text.secondary" }}
          >
            You haven't saved any favorite recipes yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {favoriteRecipes.map((recipe) => (
              <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {recipe.strMealThumb ? (
                    <RecipeCard recipe={recipe} />
                  ) : recipe.isLoading ? (
                    <Paper
                      elevation={2}
                      sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        backgroundColor: "background.paper",
                        boxShadow: "0 6px 18px rgba(16, 24, 40, 0.06)",
                      }}
                    >
                      <Skeleton variant="rectangular" height={200} />
                      <Box sx={{ p: 2 }}>
                        <Skeleton width="70%" />
                      </Box>
                    </Paper>
                  ) : (
                    <Paper
                      elevation={2}
                      sx={{
                        borderRadius: 4,
                        p: 2,
                        backgroundColor: "background.paper",
                        boxShadow: "0 6px 18px rgba(16, 24, 40, 0.06)",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        Recipe details unavailable
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try again later.
                      </Typography>
                    </Paper>
                  )}

                  {/* NOTES PANEL */}
                  <Paper
                    elevation={2}
                    sx={{
                      mt: -1,
                      p: 2,
                      borderRadius: "0 0 14px 14px",
                      backgroundColor: "white",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={700}>
                        My Notes
                      </Typography>

                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 2 }}
                        disabled={recipe.isLoading}
                        onClick={() => handleOpenModal(recipe)}
                      >
                        Edit
                      </Button>
                    </Box>

                    {recipe.notes ? (
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          color: "text.primary",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {recipe.notes}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontStyle: "italic",
                        }}
                      >
                        No notes yet. Add one!
                      </Typography>
                    )}

                    <Divider sx={{ my: 1.5 }} />

                    <Button
                      fullWidth
                      color="error"
                      variant="text"
                      onClick={() => handleRemoveFavorite(recipe.idMeal)}
                      sx={{
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255,0,0,0.06)",
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {selectedRecipe && (
        <NotesEditModal
          open={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onSave={handleSaveNotes}
        />
      )}
    </>
  );
};

export default FavoritesPage;
