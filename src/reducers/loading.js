const initialState = {
  loading: null,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOADING": {
      let newLoading = action.payload;
      return {
        loading: newLoading,
      };
    }

    case "HIDE_LOADING": {
      let newLoading = action.payload;
      return {
        loading: newLoading,
      };
    }
    default:
      return state;
  }
};

export default loading;
