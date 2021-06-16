const initialState = {
  itemCart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      const newItem = [...state.itemCart];
      newItem.unshift(action.payload);
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
