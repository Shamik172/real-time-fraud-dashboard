import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const analyzeWithGemini = async (transaction) => {
  const prompt = `
Analyze the following transaction for fraud risk.
Return ONLY valid JSON in this format:
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
    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    const parsed = JSON.parse(text);

    return {
      riskScore: Number(parsed.riskScore),
      reason: parsed.reason,
      available: true
    };

  } catch (error) {
    console.error("Gemini error:", error.message);

    // IMPORTANT: signal failure explicitly
    return {
      riskScore: null,
      reason: "Gemini unavailable",
      available: false
    };
  }
};
