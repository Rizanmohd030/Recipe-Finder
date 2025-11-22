import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/?search=${query}`);
    }
  };

  const handleScan = () => {
    navigate("/scan");
  };

  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",   // 👈 makes the whole group centered
    alignItems: "center",
    gap: 2,
    mt: 3,
    width: "100%",
  }}
>
  {/* INPUT FIELD */}
  <TextField
    variant="outlined"
    placeholder="Search recipes..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    sx={{
      flex: "0 0 50%",    // 👈 makes input shorter + centered nicely
      maxWidth: "400px",  // 👈 avoids stretching too far on big screens
      background: "#fff",
      borderRadius: 2,
    }}
  />

  {/* SEARCH BUTTON */}
  <Button
    variant="contained"
    onClick={handleSearch}
    sx={{
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 2,
      px: 3,
      background: "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
      "&:hover": {
        background:
          "linear-gradient(90deg, #FF9800 0%, #F57C00 100%)",
      },
      height: "56px", // perfectly aligns with TextField height
    }}
  >
    Search
  </Button>

  {/* SCAN BUTTON */}
  <Button
    variant="contained"
    onClick={handleScan}
    sx={{
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 2,
      px: 3,
      background: "linear-gradient(90deg, #FF8E0A 0%, #FF6D00 100%)",
      "&:hover": {
        background:
          "linear-gradient(90deg, #FF9800 0%, #F57C00 100%)",
      },
      height: "56px",
    }}
  >
    Scan
  </Button>
</Box>
  );
};

export default SearchBar;
