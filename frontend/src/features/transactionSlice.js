import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  highRisk: []
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.list.unshift(action.payload);

      if (action.payload.riskLevel === "HIGH") {
        state.highRisk.unshift(action.payload);
      }

      // keep memory in control
      if (state.list.length > 50) {
        state.list.pop();
      }
    }
  }
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
