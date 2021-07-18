const initialState = {
  itemCart: JSON.parse(localStorage.getItem("addItemToCart"))
    ? JSON.parse(localStorage.getItem("addItemToCart"))
    : [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      let newItem = [...state.itemCart];

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
      return {
        ...state,
        itemCart: newItem,
      };
    }
    case "ADD_ITEM_TO_CART_FROM_DATA_USER": {
      let newItem = [];
      newItem = action.payload;
      localStorage.setItem("addItemToCart", JSON.stringify(newItem));
      return {
        ...state,
        itemCart: newItem,
      };
    }
    case "CHANGE_ALL_ITEM_IN_CART": {
      let newItem = [];
      newItem.unshift(action.payload);
      localStorage.setItem("addItemToCart", JSON.stringify(newItem[0]));
      return {
        ...state,
        itemCart: newItem[0],
      };
    }
    case "DELETE_ITEM_IN_CART": {
      let newItem = [...state.itemCart];
      newItem.splice(action.payload, 1);
      localStorage.setItem("addItemToCart", JSON.stringify(newItem));
      return {
        ...state,
        itemCart: newItem,
      };
    }
    case "DELETE_ITEM_AND_STORAGE": {
      let newItem = [];
      localStorage.clear();
      return {
        ...state,
        itemCart: newItem,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
