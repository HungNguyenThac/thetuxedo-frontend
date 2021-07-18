import { combineReducers } from "redux";
import postBill from "./bill";
import cartReducer from "./cart";
import getInfoUser from "./infoUser";
import detailReducer from "./itemDetail";
import loading from "./loading";
import postHistoriUser from "./history";

const rootReducer = combineReducers({
  itemDetail: detailReducer,
  itemCart: cartReducer,
  loading: loading,
  GetInfoUser: getInfoUser,
  bills: postBill,
  stories: postHistoriUser,
});

export default rootReducer;
