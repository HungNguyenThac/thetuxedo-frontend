import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: {},
    loading: "idle",
  },
  reducers: {},
  extraReducers: {},
});
export default accountSlice.reducer;
