import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "../feature/product-toolkit/loading.slice";
import cartSlice from "../feature/product-toolkit/itemCart.slice";
import itemDetailSlice from "../feature/product-toolkit/itemDetail.slice";
import postBillSlice from "../feature/product-toolkit/bill.slice";
import infoUserSlice from "../feature/trangcanhan/infoUser.slice";
import postBillHistory from "../feature/product-toolkit/billHistory.slice";

const rootReducerToolkit = {
  itemDetail: itemDetailSlice,
  itemCart: cartSlice,
  loading: loadingSlice,
  GetInfoUser: infoUserSlice,
  bills: postBillSlice,
  stories: postBillHistory,
};
const storeToolkit = configureStore({
  reducer: rootReducerToolkit,
});

export default storeToolkit;
