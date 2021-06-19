const initialState = {
  itemCart: JSON.parse(localStorage.getItem("addItemToCart"))
    ? JSON.parse(localStorage.getItem("addItemToCart"))
    : [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      let newItem = [...state.itemCart];
      newItem.unshift(action.payload);
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
      console.log(newItem);
      return {
        ...state,
        itemCart: newItem,
      };
    }
    case "DELETE_ITEM_AND_STORAGE": {
      const newItem = [];
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
