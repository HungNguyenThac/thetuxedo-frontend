import { createSlice } from "@reduxjs/toolkit";

const infoUserSlice = createSlice({
  name: "infoUser",
  initialState: {
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
  reducers: {
    setInfoUserToolkit(state, action) {
      state = action.payload;
    },
    setNameUserToolkit(state, action) {
      state.name = action.payload;
    },
    setAvatarUserToolkit(state, action) {
      state.avatar = action.payload;
    },
    setNickNameUserToolkit(state, action) {
      state.nickname = action.payload;
    },
    setEmailUserToolkit(state, action) {
      state.email = action.payload;
    },
    setPhoneNumberUserToolkit(state, action) {
      state.phoneNumber = action.payload;
    },
    setAddresUserToolkit(state, action) {
      state.address = action.payload;
    },
    setGenderUserToolkit(state, action) {
      state.gender = action.payload;
    },
    setDayUserToolkit(state, action) {
      state.birthDay.day = action.payload;
    },
    setMonthUserToolkit(state, action) {
      state.birthDay.month = action.payload;
    },
    setYearUserToolkit(state, action) {
      state.birthDay.year = action.payload;
    },
  },
});

const { actions, reducer } = infoUserSlice;

export const {
  setInfoUserToolkit,
  setNameUserToolkit,
  setAvatarUserToolkit,
  setNickNameUserToolkit,
  setEmailUserToolkit,
  setPhoneNumberUserToolkit,
  setAddresUserToolkit,
  setGenderUserToolkit,
  setDayUserToolkit,
  setMonthUserToolkit,
  setYearUserToolkit,
} = actions;

export default reducer;
