export const addItemToCart = (item) => {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: item,
  };
};

export const changeAllItemInCart = (items) => {
  return {
    type: "CHANGE_ALL_ITEM_IN_CART",
    payload: items,
  };
};

export const DeleteItemInCart = (index) => {
  return {
    type: "DELETE_ITEM_IN_CART",
    payload: index,
  };
};

export const DeleteAllItemAndStorage = (array) => {
  return {
    type: "DELETE_ITEM_AND_STORAGE",
    payload: array,
  };
};
