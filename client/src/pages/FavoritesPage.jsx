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

  const notesCount = favoriteRecipes.filter((recipe) => recipe.notes && recipe.notes.trim()).length;

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
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #fff7e8 0%, #ffffff 100%)",
            border: "1px solid rgba(255,145,0,0.18)",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1.2,
              py: 0.4,
              mb: 2,
              bgcolor: "#ff5a00",
              color: "white",
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              borderRadius: 0.5,
            }}
          >
            MY COLLECTION
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1.2,
              color: "#161616",
              letterSpacing: "-0.5px",
              fontSize: { xs: "2.2rem", md: "3.2rem" },
            }}
          >
            My Favorite Recipes
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 650, lineHeight: 1.8 }}
          >
            Keep your saved recipes and notes in one place with the same RecipeHunt style you see across the app.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 1.5,
              mt: 3,
            }}
          >
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Saved recipes
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.7, fontWeight: 800 }}>
                {favoriteRecipes.length}
              </Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Recipes with notes
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.7, fontWeight: 800 }}>
                {notesCount}
              </Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Quick access
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.7, fontWeight: 800 }}>
                Edit / Remove
              </Typography>
            </Paper>
          </Box>
        </Paper>

        {favoriteRecipes.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 6, color: "text.secondary" }}
          >
            You haven't saved any favorite recipes yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favoriteRecipes.map((recipe) => (
              <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {recipe.strMealThumb ? (
                    <RecipeCard recipe={recipe} />
                  ) : recipe.isLoading ? (
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        backgroundColor: "#fffaf4",
                        border: "1px solid rgba(255,145,0,0.12)",
                      }}
                    >
                      <Skeleton variant="rectangular" height={200} />
                      <Box sx={{ p: 2 }}>
                        <Skeleton width="70%" />
                      </Box>
                    </Paper>
                  ) : (
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 4,
                        p: 2,
                        backgroundColor: "#fffaf4",
                        border: "1px solid rgba(255,145,0,0.12)",
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
                    elevation={0}
                    sx={{
                      mt: -1,
                      p: 2,
                      borderRadius: "0 0 14px 14px",
                      backgroundColor: "#fffdf8",
                      border: "1px solid rgba(255,145,0,0.12)",
                      borderTop: "none",
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
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          background: "linear-gradient(90deg, #ff9800, #f57c00)",
                          "&:hover": {
                            background: "linear-gradient(90deg, #fb8c00, #ef6c00)",
                          },
                        }}
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
                        borderRadius: 2,
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
