import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "bill",
  initialState: [],
  reducers: {
    postBillToolkit(state, action) {
      state = action.payload;
    },
  },
});

const { actions, reducer } = billSlice;

export const { postBillToolkit } = actions;

export default reducer;
