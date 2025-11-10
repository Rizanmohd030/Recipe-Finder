// src/components/SearchBar.jsx

import React from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * SearchBar component — works with query, setQuery, and handleSearch props from HomePage
 */
const SearchBar = ({ query, setQuery, handleSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      handleSearch(event);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        mt: 3,
        mb: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: 700, px: 2 }}>
        {/* Text Input */}
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            label="Search for a recipe..."
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              height: "56px",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: "0.5px",
              background:
                "linear-gradient(90deg, #6D28D9 0%, #9333EA 100%)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #7E22CE 0%, #A855F7 100%)",
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
