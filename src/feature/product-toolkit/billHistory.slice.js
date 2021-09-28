import { createSlice } from "@reduxjs/toolkit";

const billHistorySlice = createSlice({
  name: "billHistory",
  initialState: [],
  reducers: {
    postBillHistoryToolkit(state, action) {
      state = action.payload;
    },
  },
});

const { actions, reducer } = billHistorySlice;

export const { postBillHistoryToolkit } = actions;

export default reducer;
