const initialState = {
  loading: false,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOADING": {
      return {
        loading: true,
      };
    }

    case "HIDE_LOADING": {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default loading;
