const initialState = {
  stories: [],
};

const postHistoriUser = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HISTORY": {
      const newHistories = action.payload;
      return {
        stories: newHistories,
      };
    }
    default:
      return state;
  }
};

export default postHistoriUser;
