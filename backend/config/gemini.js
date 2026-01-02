import axios from "axios";

// Correct API version + model
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

export const analyzeWithGemini = async (transaction) => {
  // READ ENV AT RUNTIME (NOT AT IMPORT TIME)
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("Gemini error: Gemini API key missing");
    return {
      riskScore: null,
      reason: "Gemini unavailable",
      available: false
    };
  }

  const prompt = `
Analyze the following transaction for fraud risk.

Return ONLY valid JSON in this exact format:
{
  "riskScore": number (0-100),
  "reason": string
}

Transaction:
Amount: ${transaction.amount}
Location: ${transaction.location}
Device: ${transaction.device}
`;

  try {
    // console.log("Gemini key loaded:",GEMINI_API_KEY.slice(0, 6));

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    let text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty Gemini response");
    }

    // Gemini often wraps JSON in ```json ... ```
    text = text
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    return {
      riskScore: Number(parsed.riskScore),
      reason: parsed.reason,
      available: true
    };
  } catch (error) {
    console.error(
      "Gemini error:",
      error.response?.data || error.message
    );

    return {
      riskScore: null,
      reason: "Gemini unavailable",
      available: false
    };
  }
};
