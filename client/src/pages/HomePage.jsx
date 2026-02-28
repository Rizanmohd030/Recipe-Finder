// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import { searchRecipes } from "../services/recipeService";

import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";

import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 💡 NEW: Read ?search=egg from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search");

  // 💡 NEW: Trigger search when URL changes
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      runSearch(searchQuery);
    }
  }, [searchQuery]);

  // Extracted search logic to reuse from URL + manual search
  const runSearch = async (term) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setError(null);

    try {
      const results = await searchRecipes(term);
      setRecipes(results || []);
    } catch {
      setError("Failed to fetch recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // OLD search button (still works)
  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      
      {/* ---------------- HERO SECTION ---------------- */}
      <Paper
        elevation={0}
        sx={{
          p: 5,
          mb: 6,
          borderRadius: 4,
          textAlign: "center",
          background: "linear-gradient(135deg, #fff7e6, #ffffff)",
          border: "1px solid #ffe0b2",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
            letterSpacing: "-0.5px",
          }}
        >
          Discover & Explore Recipes  
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", mb: 3 }}
        >
          Search thousands of recipes instantly. Find meals that match your taste.
        </Typography>

        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      </Paper>

      {/* ---------------- ERROR MESSAGE ---------------- */}
      {error && <ErrorComponent message={error} />}

      {/* ---------------- RESULT GRID ---------------- */}
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Grid container spacing={4}>
              {recipes.map((recipe) => (
                <Grid
                  item
                  key={recipe.idMeal}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>

            {/* No results message */}
            {searched && !error && recipes.length === 0 && (
              <Typography
                variant="body1"
                sx={{
                  mt: 6,
                  textAlign: "center",
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
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
