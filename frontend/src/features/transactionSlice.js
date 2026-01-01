import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],        // admin: all transactions (live)
  highRisk: [],    // admin: high-risk alerts
  myList: []       // user: only own transactions
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // ADMIN + GLOBAL SOCKET
    addTransaction: (state, action) => {
      state.list.unshift(action.payload);

      if (action.payload.riskLevel === "HIGH") {
        state.highRisk.unshift(action.payload);
      }

      if (state.list.length > 50) {
        state.list.pop();
      }
    },

    // USER: initial fetch
    setMyTransactions: (state, action) => {
      state.myList = action.payload;
    },

    // USER: real-time socket update
    addMyTransaction: (state, action) => {
      state.myList.unshift(action.payload);

      if (state.myList.length > 50) {
        state.myList.pop();
      }
    }
  }
});

export const {
  addTransaction,
  setMyTransactions,
  addMyTransaction
} = transactionSlice.actions;

export default transactionSlice.reducer;
