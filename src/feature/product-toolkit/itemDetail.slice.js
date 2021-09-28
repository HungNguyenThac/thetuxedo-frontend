import { createSlice } from "@reduxjs/toolkit";

const itemDetailSlice = createSlice({
  name: "itemDetail",
  initialState: {},
  reducers: {
    addItemToDetailToolkit(state, action) {
      state = action.payload;
    },
  },
});

const { actions, reducer } = itemDetailSlice;

export const { addItemToDetailToolkit } = actions;

export default reducer;
