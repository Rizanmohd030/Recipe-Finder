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
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.12)",
          minHeight: { md: 420 },
        }}
      >
        <Box
          sx={{
            bgcolor: "#f7efe5",
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              alignSelf: "flex-start",
              px: 1.2,
              py: 0.4,
              mb: 2.5,
              bgcolor: "#ff5a00",
              color: "white",
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              borderRadius: 0.5,
            }}
          >
            AUTOMATED!
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              mb: 2,
              color: "#161616",
              fontSize: { xs: "2.7rem", md: "4rem" },
            }}
          >
            Snap a dish,
            <br />
            get the <Box component="span" sx={{ color: "#ff5a00", fontStyle: "italic" }}>recipe</Box>
            <br />
            instantly.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 520,
              color: "#5f5f5f",
              lineHeight: 1.8,
              mb: 3.5,
              fontSize: { xs: "0.98rem", md: "1.02rem" },
            }}
          >
            Point your camera at any food. Our AI identifies it in seconds and
            delivers the perfect recipe — ingredients, steps, and all.
          </Typography>

          <Box
            sx={{
              position: "relative",
              pt: { xs: 0, sm: 5 },
              minHeight: { sm: 92 },
            }}
          >
            <Box
              sx={{
                position: { xs: "static", sm: "absolute" },
                top: { sm: 0 },
                left: { sm: -2 },
                mb: { xs: 1.5, sm: 0 },
                display: "inline-flex",
                alignItems: "center",
                px: 2,
                py: 1.15,
                borderRadius: 3,
                bgcolor: "white",
                border: "2px dotted #ff5a00",
                color: "#ff5a00",
                fontWeight: 800,
                fontSize: "0.86rem",
                boxShadow: "0 8px 18px rgba(255,90,0,0.08)",
                whiteSpace: "nowrap",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  right: -12,
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "12px solid #ff5a00",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  right: -9,
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: "10px solid white",
                  zIndex: 1,
                },
              }}
            >
              Scan Food is the main feature
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Button
                component={Link}
                to="/scan"
                variant="contained"
                sx={{
                  minWidth: 120,
                  px: 2.5,
                  py: 1.2,
                  fontWeight: 700,
                  borderRadius: 2,
                  background: "#111111",
                  "&:hover": { background: "#222222" },
                }}
              >
                📷 Scan Food
              </Button>

              <Button
                onClick={handleBrowseClick}
                variant="outlined"
                sx={{
                  minWidth: 140,
                  px: 2.5,
                  py: 1.2,
                  fontWeight: 700,
                  borderRadius: 2,
                  borderColor: "#111111",
                  color: "#111111",
                  "&:hover": {
                    borderColor: "#111111",
                    bgcolor: "rgba(17,17,17,0.04)",
                  },
                }}
              >
                Browse Recipes
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "#111111",
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 4, md: 6 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HomeHeroCarousel />
        </Box>
      </Box>

      <HomeStatsBanner />

      <Box ref={browseSectionRef} id="browse-recipes" sx={{ mt: 5 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.08)",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 1, color: "text.primary" }}
          >
            Browse Recipes
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 620, mb: 1.5 }}
          >
            Search the recipe library or jump to the scanner when you want to
            identify a dish quickly.
          </Typography>

          <SearchBar />
        </Paper>
      </Box>

      {error && (
        <Box sx={{ mt: 4 }}>
          <ErrorComponent message={error} />
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Grid container spacing={4}>
              {recipes.map((recipe) => (
                <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>

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
