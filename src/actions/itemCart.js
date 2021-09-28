export const addItemToCart = (item) => {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: item,
  };
};

export const changeQuantityItemInCart = (items) => {
  return {
    type: "CHANGE_QUANTITY_ITEM_IN_CART",
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

export const addItemToCartFormDataUser = (array) => {
  return {
    type: "ADD_ITEM_TO_CART_FROM_DATA_USER",
    payload: array,
  };
};
