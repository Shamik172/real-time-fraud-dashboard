import { analyzeWithGemini } from "../config/gemini.js";

export const analyzeTransaction = async (transaction) => {
  let riskScore = 0;
  const reasons = [];

  // Rule 1: High transaction amount
  if (transaction.amount > 3000) {
    riskScore += 30;
    reasons.push("High transaction amount");
  }

  // Rule 2: Very high amount (extra penalty)
  if (transaction.amount > 4500) {
    riskScore += 10;
    reasons.push("Unusually large transaction");
  }

  // Rule 3: High-risk location
  if (transaction.locationRisk >= 40) {
    riskScore += 40;
    reasons.push("Transaction from high-risk location");
  }

  // Rule 4: Unknown device
  if (transaction.device === "Unknown") {
    riskScore += 20;
    reasons.push("Unknown device used");
  }

  // Cap risk score at 100
  if (riskScore > 100) riskScore = 100;

  // Gemini AI analysis
  const aiResult = await analyzeWithGemini(transaction);

  // Weighted final score
  const finalRiskScore = Math.min(
    Math.round(riskScore * 0.6 + aiResult.riskScore * 0.4),
    100
  );


  // Risk classification
  let riskLevel = "LOW";
  if (finalRiskScore >= 70) riskLevel = "HIGH";
  else if (finalRiskScore >= 40) riskLevel = "MEDIUM";

  return {
    ...transaction,
    riskScore : finalRiskScore,
    riskLevel,
    reasons: [...reasons, aiResult.reason]
  };
};
