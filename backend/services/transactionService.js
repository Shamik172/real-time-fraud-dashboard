import { analyzeTransaction } from "./fraudAnalyzer.js";
import Transaction from "../models/Transaction.js";
import { emitTransaction } from "../sockets/transaction.socket.js";

export const processTransaction = async (transaction) => {
  // Step 1: Analyze transaction for fraud (AWAIT IS CRITICAL)
  const analyzedTransaction = await analyzeTransaction(transaction);

  // Step 2: Save enriched transaction to DB
  await Transaction.create(analyzedTransaction);

  // Step 3: Emit via Socket.io
  emitTransaction(analyzedTransaction);

  return analyzedTransaction;
};
