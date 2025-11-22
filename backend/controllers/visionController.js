const visionService = require('../services/visionService');
const recipeService = require('../services/recipeService');
const cleanFoodName = require("../utils/cleanFoodName");

exports.identifyFood = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Get raw food prediction from vision AI
    const rawFood = await visionService.identifyFoodFromBase64(image);

    // Clean it into a usable food name
    const foodName = cleanFoodName(rawFood);

    // 🔥 LOGGING MUST COME BEFORE ANY RETURN
    console.log("RAW_FROM_AI:", rawFood);
    console.log("CLEANED_FOOD:", foodName);

    // If we couldn't identify anything
    if (!foodName) {
      return res.json({ foodName: null, recipes: [] });
    }

    // Search your recipe API
    const recipes = await recipeService.searchRecipes(foodName);

    return res.json({ foodName, recipes });

  } catch (err) {
    console.error("Vision error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
