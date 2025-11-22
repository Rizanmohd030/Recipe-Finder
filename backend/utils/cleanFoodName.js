module.exports = function cleanFoodName(name) {
  if (!name) return null;

  let cleaned = name.toLowerCase().trim();

  // Remove common noise words
  cleaned = cleaned
    .replace(/\b(food|dish|item|picture|image|photo|plate)\b/g, "")
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  // Known food keywords (high accuracy)
  const keywords = [
    "pizza",
    "burger",
    "sandwich",
    "pasta",
    "biryani",
    "noodles",
    "fried rice",
    "dosa",
    "idli",
    "vada",
    "ramen",
    "sushi",
    "salad",
    "cake",
    "donut",
    "omelette",
    "paratha",
    "roti",
    "wrap",
    "taco",
    "pancake"
  ];

  // If cleaner string contains any known keyword → return that keyword
  for (const key of keywords) {
    if (cleaned.includes(key)) return key;
  }

  // Fallback:
  // If the string has 2+ words → return the LAST word (usually dish type)
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return parts[parts.length - 1];
  }

  return cleaned || null;
};
