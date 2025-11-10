import React, { useState, useEffect } from "react";
import { getFavorites, removeFavorite } from '../services/favoriteService';
import { getRecipeById } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from '../components/LoadingSpinner';

import ErrorComponent from '../components/ErrorComponent';


import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);        
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setError(null);
        setLoading(true);

        // 1️⃣ Fetch favorite IDs from your backend
        const ids = await getFavorites();
        setFavoriteIds(ids);

        if (ids.length === 0) {
          setFavoriteRecipes([]);
          return;
        }

        // 2️⃣ Fetch full recipe data from TheMealDB API
        const recipePromises = ids.map((id) => getRecipeById(id));
        const recipes = await Promise.all(recipePromises);

        // 3️⃣ Save full recipe data into state
        setFavoriteRecipes(recipes);
      } catch (err) {
        console.error("❌ Error fetching favorites:", err);
        setError(
          err.message || "An error occurred while fetching your favorites."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

   const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFavorite(recipeId);

     
      setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.idMeal !== recipeId)
      );
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      alert(err.message || 'Could not remove favorite. Please try again.');
    }
  };

  // 🌀 Loading state
if (loading) return <LoadingSpinner />;


  // ⚠️ Error state
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }

  // ✅ Render recipes
return (
    <div className="favorites-page-container">
      <h1>My Favorite Recipes</h1>
      
      {favoriteRecipes.length === 0 ? (
        <p>You haven't saved any favorite recipes yet. Start exploring!</p>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.idMeal} className="favorite-card-container">
              <RecipeCard recipe={recipe} />
              <button 
                onClick={() => handleRemoveFavorite(recipe.idMeal)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

