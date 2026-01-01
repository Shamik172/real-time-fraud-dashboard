import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../services/socket";
import { addTransaction } from "../features/transactionSlice";

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("transaction:new", (data) => {
      dispatch(addTransaction(data));
    });

    return () => {
      socket.off("transaction:new");
    };
  }, [dispatch]);
};
