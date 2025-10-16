import axios from "axios";

// Base URLs (pick the one you need)
const _baseURL = "https://localhost:44315/api"; // local API
const _productURL = "http://103.53.52.215:85/api"; // product API
const _userURL = "http://manojvgl-001-site4.ctempurl.com/api/"; // user API

// Axios instance for authenticated requests (with token)
export const authAxios = axios.create({
  baseURL: _baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios instance for public requests (login, public APIs)
export const publicAxios = axios.create({
  baseURL: _baseURL,
});

// Add token automatically to publicAxios requests if available
publicAxios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
