export const showLoading = (value) => {
  return {
    type: "SHOW_LOADING",
    payload: value,
  };
};

export const hideLoading = (value) => {
  return {
    type: "HIDE_LOADING",
    payload: value,
  };
};
