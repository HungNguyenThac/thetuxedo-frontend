import axiosClient from "./axiosClient";

const accountUrl = "/user";

const accountApi = {
  PostUserSignup: (userName, email, phoneNumber, password) => {
    return axiosClient.post(`${accountUrl}/signup`, {
      userName,
      email,
      phoneNumber,
      password,
    });
  },
  PostLoginWithGoogle: (loginName, name, email, phoneNumber, avatar) => {
    return axiosClient.post(`${accountUrl}/login-gg`, {
      loginName,
      name,
      email,
      phoneNumber,
      avatar,
    });
  },
  PostLoginWithFacebook: (loginName, name, email, phoneNumber, avatar) => {
    return axiosClient.post(`${accountUrl}/login-fb`, {
      loginName,
      name,
      email,
      phoneNumber,
      avatar,
    });
  },
};

export default accountApi;
