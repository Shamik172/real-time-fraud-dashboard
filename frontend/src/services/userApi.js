import api from "./api";

/**
 * User clicks "Generate Transaction"
 * POST /transactions/generate
 */
export const generateUserTransaction = () => {
  return api.post("/transactions/generate");
};

/**
 * Fetch logged-in user's past transactions
 * GET /transactions/my
 */
export const fetchMyTransactions = () => {
  return api.get("/transactions/my");
};
