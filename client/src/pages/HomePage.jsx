// src/pages/HomePage.jsx

import React, { useState } from "react";
import { searchRecipes } from "../services/recipeService";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent"; // ✅ NEW

import { Container, Grid, Typography, Box } from "@mui/material";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // ✅ NEW

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setError(null); // ✅ Clear previous error

    try {
      const results = await searchRecipes(query);
      if (!results || results.length === 0) {
        setRecipes([]);
      } else {
        setRecipes(results);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to fetch recipes. Please try again later.");
      setRecipes([]); // clear any previous results
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 1,
          background: "linear-gradient(90deg, #6D28D9, #9333EA)",
          backgroundClip: "text",
          textFillColor: "transparent",
        }}
      >
        Recipe Finder
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover your next favorite meal. Search for any recipe you can imagine!
      </Typography>

      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

      {/* --- CENTRALIZED ERROR DISPLAY --- */}
      {error && <ErrorComponent message={error} />}

      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Grid container spacing={3} justifyContent="center">
              {recipes.map((recipe) => (
                <Grid
                  item
                  key={recipe.idMeal}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>

            {/* No results message */}
            {searched && !error && recipes.length === 0 && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 6, fontStyle: "italic" }}
              >
                No recipes found. Try another search!
              </Typography>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
