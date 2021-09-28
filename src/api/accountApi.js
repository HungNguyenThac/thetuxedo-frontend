import { getCookie } from "../shareFunction/checkCookies";
import axiosClient from "./axiosClient";

const accountUrl = "/account";

const accountApi = {
  PostUserSignuUp: (userName, email, phoneNumber, password) => {
    return axiosClient.post(`${accountUrl}/signup`, {
      userName,
      email,
      phoneNumber,
      password,
    });
  },

  PostLoginWithSocialNetwork: (loginName, name, email, phoneNumber, avatar) => {
    return axiosClient.post(`${accountUrl}/loginSocialNetwork`, {
      loginName,
      name,
      email,
      phoneNumber,
      avatar,
    });
  },

  PostLogin: (loginName, password) => {
    return axiosClient.post(`${accountUrl}/login`, {
      loginName,
      password,
    });
  },

  PostSignUp: (loginName, email, phoneNumber, password) => {
    return axiosClient.post(`${accountUrl}/signup`, {
      loginName,
      email,
      phoneNumber,
      password,
    });
  },

  PostForgotPassword: (loginName, email) => {
    return axiosClient.post(`${accountUrl}/forgot`, {
      loginName,
      email,
    });
  },

  PostChangePasswords: (email, password, codeVerify) => {
    return axiosClient.post(`${accountUrl}/changepasswords`, {
      email,
      password,
      codeVerify,
    });
  },

  UpdatePassword: (newPassword, oldPassword) => {
    let token = getCookie("user");
    return axiosClient.post(
      `${accountUrl}/updatePassword`,
      {
        newPassword,
        oldPassword,
      },
      {
        headers: { authorization: token },
      }
    );
  },
};

export default accountApi;
