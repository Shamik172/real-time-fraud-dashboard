let ioInstance = null;

export const initTransactionSocket = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("-> Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("X Socket disconnected:", socket.id);
    });
  });
};

export const emitTransaction = (transaction) => {
    console.log("Emitting transaction:", transaction.transactionId);

  if (ioInstance) {
    ioInstance.emit("transaction:new", transaction);
  }
};
