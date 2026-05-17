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
      setFavoriteRecipes((prev) => prev.filter((item) => item.idMeal !== recipeId));
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
        prev.map((r) => (r.idMeal === recipeId ? { ...r, notes: newNotes } : r))
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
      <Container maxWidth="lg">
        <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#fffdf7" }}>
          <Box
            sx={{
              display: "inline-flex",
              px: 1,
              py: 0.45,
              mb: 2,
              bgcolor: "secondary.main",
              color: "#ffffff",
              border: "2px solid #111111",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Favorites
          </Box>

          <Typography variant="h2" sx={{ fontSize: { xs: "1.95rem", sm: "2.2rem", md: "3.8rem" } }}>
            Your saved recipes
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5, maxWidth: 640, color: "text.secondary" }}>
            Everything is now styled with the same graphic language: white blocks, bold borders,
            and direct actions.
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Paper sx={{ p: 2, bgcolor: "#ffffff" }}>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                Saved recipes
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                {favoriteRecipes.length}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: "#ffffff" }}>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                Notes added
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                {notesCount}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: "#ffffff" }}>
              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                Quick actions
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                Edit / Remove
              </Typography>
            </Paper>
          </Box>
        </Paper>

        <Box sx={{ mt: 4 }}>
          {favoriteRecipes.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#fffdf7" }}>
              <Typography variant="h5">You have not saved any recipes yet.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {favoriteRecipes.map((recipe) => (
                <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {recipe.strMealThumb ? (
                      <RecipeCard recipe={recipe} />
                    ) : recipe.isLoading ? (
                      <Paper sx={{ overflow: "hidden", bgcolor: "#ffffff" }}>
                        <Skeleton variant="rectangular" height={220} />
                        <Box sx={{ p: 2 }}>
                          <Skeleton width="70%" />
                        </Box>
                      </Paper>
                    ) : (
                      <Paper sx={{ p: 2, bgcolor: "#ffffff" }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          Recipe details unavailable
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Try again later.
                        </Typography>
                      </Paper>
                    )}

                    <Paper
                      sx={{
                        p: 2,
                        mt: 1.5,
                        bgcolor: "#ffffff",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                          gap: 1,
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={700}>
                          Notes
                        </Typography>

                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          disabled={recipe.isLoading}
                          onClick={() => handleOpenModal(recipe)}
                        >
                          Edit
                        </Button>
                      </Box>

                      {recipe.notes ? (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}
                        >
                          {recipe.notes}
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          No notes yet.
                        </Typography>
                      )}

                      <Divider sx={{ my: 1.5 }} />

                      <Button
                        fullWidth
                        color="error"
                        variant="text"
                        onClick={() => handleRemoveFavorite(recipe.idMeal)}
                        sx={{
                          border: "2px solid #111111",
                          color: "#d92d20",
                          "&:hover": {
                            backgroundColor: "#fff2f0",
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
        </Box>
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
