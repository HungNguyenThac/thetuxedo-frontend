const initialState = {
  infoUser: {
    name: "",
    nickname: "",
    avatar: "",
    gender: "",
    birthDay: {
      day: "",
      month: "",
      year: "",
    },
    address: [],
    cart: [],
    bill: {},
    loginName: "",
    email: "",
    phoneNumber: "",
    password: "",
  },
};

const getInfoUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INFO_USER": {
      let dataUser = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_NAME_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.name = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_AVATAR_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.avatar = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_NICKNAME_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.nickName = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_EMAIL_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.email = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_PHONE_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.phoneNumber = action.payload;
      return {
        infoUser: dataUser,
      };
    }

    case "SET_ADDRESS_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.address = action.payload;
      return {
        infoUser: dataUser,
      };
    }

    case "SET_GENDER_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.gender = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_DAY_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.birthDay.day = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_MONTH_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.birthDay.month = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    case "SET_YEAR_USER": {
      let dataUser = { ...state.infoUser };
      dataUser.birthDay.year = action.payload;
      return {
        infoUser: dataUser,
      };
    }
    default:
      return state;
  }
};

export default getInfoUser;
