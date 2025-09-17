import axios from "axios";

const API_URL = "https://backend-schoolapp.onrender.com/api";

export const api = axios.create({
  baseURL: API_URL,
});

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
