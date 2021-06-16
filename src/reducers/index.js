import { combineReducers } from "redux";
import cartReducer from "./cart";
import detailReducer from "./itemDetail";

const rootReducer = combineReducers({
  itemDetail: detailReducer,
  itemCart: cartReducer,
});

export default rootReducer;
