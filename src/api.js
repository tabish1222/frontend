import axios from "axios";
const API = process.env.REACT_APP_API_URL || "http://localhost:10000";

export function setAuthHeader(token) {
  axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
}

export async function post(path, data) {
  return (await axios.post(`${API}${path}`, data)).data;
}
export async function get(path) {
  return (await axios.get(`${API}${path}`)).data;
}
