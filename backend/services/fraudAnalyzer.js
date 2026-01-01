export const analyzeTransaction = (transaction) => {
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

  // Risk classification
  let riskLevel = "LOW";
  if (riskScore >= 70) riskLevel = "HIGH";
  else if (riskScore >= 40) riskLevel = "MEDIUM";

  return {
    ...transaction,
    riskScore,
    riskLevel,
    reasons
  };
};
