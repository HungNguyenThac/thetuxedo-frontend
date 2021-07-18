export const postBillToReducer = (bills) => {
  return {
    type: "POST_BILL_TO_REDUCER",
    payload: bills,
  };
};
