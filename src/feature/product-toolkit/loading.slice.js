import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    showLoadingToolkit(state) {
      return (state = true);
    },
    hideLoadingToolkit(state) {
      return (state = false);
    },
  },
});

const { actions, reducer } = loadingSlice;
export const { showLoadingToolkit, hideLoadingToolkit } = actions;
export default reducer;
