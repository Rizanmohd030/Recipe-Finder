import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, InputAdornment, Typography } from "@mui/material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) 132px" },
          alignItems: "stretch",
          width: "100%",
          maxWidth: 760,
          mx: "auto",
          bgcolor: "#ffffff",
          border: "2px solid #111111",
          boxShadow: "10px 10px 0 #111111",
          overflow: "hidden",
        }}
      >
        <TextField
          variant="outlined"
          placeholder=" search recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography
                  component="span"
                  sx={{ color: "primary.main", fontSize: "1.35rem", fontWeight: 700 }}
                >
                  ✚
                </Typography>
              </InputAdornment>
            ),
            sx: {
              height: "100%",
              "& fieldset": { border: "none" },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
            "& .MuiOutlinedInput-input": {
              py: 2.15,
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "primary.main",
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearch}
          sx={{
            border: "none",
            borderLeft: { xs: "2px solid #111111", sm: "2px solid #111111" },
            minHeight: { xs: 64, sm: "auto" },
            fontSize: "1.05rem",
            "&:hover": {
              transform: "translate(0, 0)",
            },
          }}
        >
          Search 
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => navigate("/scan")}>
          Open Scanner
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
