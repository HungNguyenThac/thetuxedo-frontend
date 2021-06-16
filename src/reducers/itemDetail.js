const initialState = {
  itemDetail: [],
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_DETAIL": {
      const newItem = [...state.itemDetail];
      newItem.splice(0, 1);
      newItem.push(action.payload);
      return {
        itemDetail: newItem,
      };
    }
    default:
      return state;
  }
};

export default detailReducer;
