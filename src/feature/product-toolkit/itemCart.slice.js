import { createSlice } from "@reduxjs/toolkit";

const itemInCartSlice = createSlice({
  name: "itemInCart",
  initialState: JSON.parse(localStorage.getItem("addItemToCart"))
    ? JSON.parse(localStorage.getItem("addItemToCart"))
    : [],
  reducers: {
    addItemToCartToolkit(state, action) {
      let newItem = [...state];
      let value = newItem.filter(
        (el) => el.id === action.payload.id && el.size === action.payload.size
      );
      let index = newItem.findIndex(
        (el) => el.id === action.payload.id && el.size === action.payload.size
      );
      if (value.length >= 1) {
        let numberItem = value.reduce(
          (total, el) => total + el.soLuong,
          action.payload.soLuong
        );
        let item = { ...action.payload, soLuong: numberItem };
        newItem.splice(index, 1);
        newItem.unshift(item);
        localStorage.setItem("addItemToCart", JSON.stringify(newItem));
      } else if (value.length < 1) {
        newItem.unshift(action.payload);
        localStorage.setItem("addItemToCart", JSON.stringify(newItem));
      }
      state = newItem;
    },
  },
  changeQuantityItemInCartToolkit(state, action) {
    state.unshift(action.payload);
    localStorage.setItem("addItemToCart", JSON.stringify(state[0]));
  },
  addItemToCartFormDataUserToolkit(state, action) {
    state = action.payload;
    localStorage.setItem("addItemToCart", JSON.stringify(state));
  },
  deleteItemInCartToolkit(state, action) {
    state.splice(action.payload, 1);
    localStorage.setItem("addItemToCart", JSON.stringify(state));
  },
  deleteItemAndStorageToolkit(state) {
    state = [];
    localStorage.clear();
  },
});

const { actions, reducer } = itemInCartSlice;

export const {
  addItemToCartToolkit,
  changeQuantityItemInCartToolkit,
  deleteItemInCartToolkit,
  deleteItemAndStorageToolkit,
} = actions;

export default reducer;
