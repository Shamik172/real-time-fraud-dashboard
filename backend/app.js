import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transaction.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/transactions", transactionRoutes)

export default app;
