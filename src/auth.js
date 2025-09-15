import { apiRequest } from "./api";

export function register(user) {
  return apiRequest("/auth/register", "POST", user);
}

export function login(credentials) {
  return apiRequest("/auth/login", "POST", credentials);
}
