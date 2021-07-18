const initialState = {
  bills: [],
};

const postBill = (state = initialState, action) => {
  switch (action.type) {
    case "POST_BILL_TO_REDUCER": {
      let newBills = [...state.bills];
      newBills = action.payload;
      return {
        bills: newBills,
      };
    }
    default:
      return state;
  }
};

export default postBill;
