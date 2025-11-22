const axios = require('axios');

const BASE = "https://www.themealdb.com/api/json/v1/1/";

async function searchRecipes(query) {
  if (!query) return [];

  try {
    const url = `${BASE}/search.php?s=${encodeURIComponent(query)}`;
    const res = await axios.get(url);

    return res.data.meals || [];
  } catch (err) {
    console.error("Recipe API error:", err.message);
    return [];
  }
}

module.exports = { searchRecipes };
