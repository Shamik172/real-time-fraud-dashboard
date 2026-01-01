import { analyzeTransaction } from "./fraudAnalyzer.js";
import Transaction from "../models/Transaction.js";

export const processTransaction = async (transaction) => {
  // Step 1: Analyze transaction for fraud
  const analyzedTransaction = analyzeTransaction(transaction);

  // Step 2: Save to database
  await Transaction.create(analyzedTransaction);
  // Step 3: Emit via Socket.io

  return analyzedTransaction;
};
