import jwt from "jsonwebtoken";

let ioInstance = null;

export const initTransactionSocket = (io) => {
  ioInstance = io;

  // JWT auth for sockets
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // { userId, role }
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`→ Socket connected ${socket.id} (${socket.user.role})`);

    // Role-based rooms
    if (socket.user.role === "admin") {
      socket.join("admins");
    } else {
      socket.join(`user:${socket.user.userId}`);
    }

    socket.on("disconnect", () => {
      console.log("✖ Socket disconnected:", socket.id);
    });
  });
};

// Emit events from services
export const emitTransaction = (transaction) => {
  if (!ioInstance) return;

  // Admin gets everything
  ioInstance.to("admins").emit("transaction:new", transaction);

  // User gets only own transaction
  if (transaction.userId) {
    ioInstance
      .to(`user:${transaction.userId}`)
      .emit("transaction:mine", transaction);
  }
};
