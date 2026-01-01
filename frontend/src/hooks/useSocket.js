import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSocket } from "../services/socket";
import {
  addTransaction,
  addMyTransaction
} from "../features/transactionSlice";

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    console.log("**Socket listeners attached");

    socket.on("transaction:new", (tx) => {
      dispatch(addTransaction(tx)); // admin view
    });

    socket.on("transaction:mine", (tx) => {
      dispatch(addMyTransaction(tx)); // user view
    });

    return () => {
      socket.off("transaction:new");
      socket.off("transaction:mine");
    };
  }, [dispatch]);
};
