// ============================================================================
// Gemini 2.5 Flash Vision – REST API (Correct + Clean)
// ============================================================================

async function identifyFoodFromBase64(base64Image) {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `
You are a food classification AI.

Task:
- Identify the food shown in the image.
- Output ONLY the final dish name (lowercase).
- If the dish name contains multiple words, return the simplified known dish type.

Examples:
Pepperoni Pizza → pizza
Chicken Burger → burger
Cheese Sandwich → sandwich
Masala Dosa → dosa
Chicken Biryani → biryani
Chocolate Cake → cake

Rules:
- No descriptions.
- No extra words.
- No sentences.
- Just ONE dish name.
`
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image.split(",")[1],
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("GEMINI RAW RESPONSE:", data);

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

    return text;

  } catch (err) {
    console.error("Gemini 2.5 Vision Error:", err);
    return null;
  }
}

module.exports = { identifyFoodFromBase64 };
