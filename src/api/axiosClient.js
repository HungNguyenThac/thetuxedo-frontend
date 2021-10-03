import axios from "axios";
import { queryString } from "query-string";

const axiosClient = axios.create({
  baseURL: "http://thetuxedo-dev.herokuapp.com/",
  // baseURL: "http://localhost:9527/",
  paramsSerializer: (params) => queryString.queryString(params),
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
