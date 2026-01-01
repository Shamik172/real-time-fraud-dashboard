import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initTransactionSocket } from "./sockets/transaction.socket.js";
import authRoutes from "./routes/auth.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"

// import { startTransactionStream } from "./services/transactionGenerator.js";
// import { processTransaction } from "./services/transactionService.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use("/auth", authRoutes)
app.use("/transactions", transactionRoutes)

// Initialize socket logic
initTransactionSocket(io);

// startTransactionStream(async (tx) => {
//   const finalTx = await processTransaction(tx);
//   console.log("tran: ",tx)
// //   console.log("Saved Transaction:", finalTx.riskLevel);
// });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
