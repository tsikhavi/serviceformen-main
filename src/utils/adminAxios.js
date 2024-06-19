import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("esco_token_admin");
  return config;
});

export default instance;
