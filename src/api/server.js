import { store } from "../app/store";
const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = store.getState().auth.token;
    if (token) config.headers.token = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
