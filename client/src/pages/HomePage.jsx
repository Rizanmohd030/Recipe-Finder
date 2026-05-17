import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import HomeHeroCarousel from "../components/HomeHeroCarousel";
import HomeStatsBanner from "../components/HomeStatsBanner";
import { searchRecipes } from "../services/recipeService";

const badgeSx = {
  display: "inline-flex",
  alignItems: "center",
  px: 1,
  py: 0.45,
  mb: 2.5,
  bgcolor: "secondary.main",
  color: "#ffffff",
  border: "2px solid #111111",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  maxWidth: "100%",
};

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const browseSectionRef = useRef(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search");

  useEffect(() => {
    if (searchQuery) {
      runSearch(searchQuery);
      browseSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchQuery]);

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

  const handleBrowseClick = () => {
    browseSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
              gap: { xs: 3, md: 4 },
              alignItems: "center",
            }}
          >
            <Box>
              <Box sx={badgeSx}>Scan-first recipe search</Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.35rem", sm: "3rem", md: "5.2rem" },
                  lineHeight: { xs: 0.94, md: 0.88 },
                  maxWidth: 560,
                }}
              >
                Find food
                <br />
                fast.
                <br />
                <Box component="span" sx={{ color: "secondary.main" }}>
                  Cook next.
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  maxWidth: 540,
                  color: "text.secondary",
                  fontSize: { xs: "0.96rem", md: "1.08rem" },
                }}
              >
                Search recipes or point your camera at a dish and jump straight into ingredients,
                instructions, and saved favorites.
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3 }}>
                <Button
                  component={Link}
                  to="/scan"
                  variant="contained"
                  color="secondary"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Scan Food
                </Button>
                <Button
                  onClick={handleBrowseClick}
                  variant="outlined"
                  color="primary"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Browse Recipes
                </Button>
              </Box>
            </Box>

            <HomeHeroCarousel />
          </Box>
        </Paper>

        <HomeStatsBanner />

        <Paper ref={browseSectionRef} id="browse-recipes" sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "3rem" } }}>
            Browse Recipes
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1.5, maxWidth: 620, color: "text.secondary" }}
          >
            Your next favorite recipe starts here.
          </Typography>

          <SearchBar />
        </Paper>

        {error && <ErrorComponent message={error} />}

        <Box sx={{ pb: 2 }}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {recipes.length > 0 && (
                <Grid container spacing={3}>
                  {recipes.map((recipe) => (
                    <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                      <RecipeCard recipe={recipe} />
                    </Grid>
                  ))}
                </Grid>
              )}

              {searched && !error && recipes.length === 0 && (
                <Paper sx={{ p: 3, mt: 2, textAlign: "center", bgcolor: "#fffdf7" }}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    No recipes found. Try another search.
                  </Typography>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
