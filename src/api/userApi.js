import axiosClient from "./axiosClient";
import { getCookie } from "../shareFunction/checkCookies";

const userUrl = "/user";

const userApi = {
  getDataUser: () => {
    let token = getCookie("user");
    return axiosClient.get(`${userUrl}/getdata`, {
      headers: { authorization: token },
    });
  },

  postAddInfoUser: (phoneNumber, password) => {
    let token = getCookie("user");

    return axiosClient.post(
      `${userUrl}/addinfo`,
      {
        phoneNumber,
        password,
      },
      {
        headers: { authorization: token },
      }
    );
  },

  putUpdateInfoUser: (
    name,
    nickName,
    gender,
    day,
    month,
    year,
    email,
    phoneNumber
  ) => {
    let token = getCookie("user");
    return axiosClient.put(
      `${userUrl}/updateinfouser`,
      {
        name,
        nickName,
        gender,
        day,
        month,
        year,
        email,
        phoneNumber,
      },
      {
        headers: { authorization: token },
      }
    );
  },

  putUpdateAddres: (address) => {
    let token = getCookie("user");

    return axiosClient.put(
      `${userUrl}/updateaddress`,
      {
        address,
      },
      {
        headers: { authorization: token },
      }
    );
  },

  putAddCurrentBill: (bill) => {
    let token = getCookie("user");

    return axiosClient.put(
      `${userUrl}/updatebill`,
      {
        bill,
      },
      {
        headers: { authorization: token },
      }
    );
  },

  putAddHistoryBill: (bill) => {
    let token = getCookie("user");

    return axiosClient.put(
      `${userUrl}/updatehistorybill`,
      {
        bill,
      },
      {
        headers: { authorization: token },
      }
    );
  },

  putAddNewCart: (newCart) => {
    let token = getCookie("user");

    return axiosClient.put(
      `${userUrl}/updatecart`,
      {
        newCart,
      },
      {
        headers: { authorization: token },
      }
    );
  },

  postCheckInfoUser: () => {
    let token = getCookie("user");
    return axiosClient.post(
      `${userUrl}/checkinfouser`,
      {},
      {
        headers: { authorization: token },
      }
    );
  },
};

export default userApi;
