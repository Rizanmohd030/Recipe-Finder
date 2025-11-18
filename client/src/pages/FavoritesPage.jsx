import React, { useState, useEffect } from "react";
import { getFavorites, removeFavorite, updateFavoriteNotes } from "../services/favoriteService";
import { getRecipeById } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import NotesEditModal from "../components/NotesEditModal";

import { Container, Grid, Typography, Box, Paper, Button } from "@mui/material";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchAndProcessFavorites = async () => {
      try {
        setLoading(true);

        const favoriteObject = await getFavorites(); 

        if (favoriteObject.length === 0) {
          setFavoriteRecipes([]);
          setLoading(false);
          return;
        }

        // Extract array of IDs
        const recipeIds = favoriteObject.map((fav) => fav.recipeId);

        // Fetch details from TheMealDB
        const recipeDetailPromises = recipeIds.map((id) => getRecipeById(id));
        const fetchedRecipeDetails = await Promise.all(recipeDetailPromises);

        // Merge details + notes
        const combinedRecipes = fetchedRecipeDetails.map((recipe) => {
          const fav = favoriteObject.find((f) => f.recipeId === recipe.idMeal);

          return {
            ...recipe,
            notes: fav ? fav.notes : "",
          };
        });

        setFavoriteRecipes(combinedRecipes);
      } catch (err) {
        console.error("Error loading favorites:", err);
        setError(err.message || "Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessFavorites();
  }, []);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFavorite(recipeId);

      setFavoriteRecipes((prev) => prev.filter((r) => r.idMeal !== recipeId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Could not remove favorite. Try again.");
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
      // 1. update backend
      await updateFavoriteNotes(recipeId, newNotes);

      // 2. update UI
      setFavoriteRecipes((prev) =>
        prev.map((recipe) =>
          recipe.idMeal === recipeId
            ? { ...recipe, notes: newNotes }
            : recipe
        )
      );

      handleCloseModal();
    } catch (err) {
      console.error("Failed to save notes:", err);
      alert("Could not save notes. Try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          My Favorite Recipes
        </Typography>

        {favoriteRecipes.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            You haven’t saved any favorite recipes yet. Start exploring!
          </Typography>
        ) : (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {favoriteRecipes.map((recipe) => (
              <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <RecipeCard recipe={recipe} />
                  </Box>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      mt: -1,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      bgcolor: "background.default",
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
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        My Notes:
                      </Typography>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenModal(recipe)}
                      >
                        Edit
                      </Button>
                    </Box>

                    {recipe.notes ? (
                      <Typography
                        variant="body2"
                        sx={{ fontStyle: "italic", whiteSpace: "pre-wrap" }}
                      >
                        {recipe.notes}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        No notes yet. Add one!
                      </Typography>
                    )}
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Render modal only when a recipe is selected */}
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
