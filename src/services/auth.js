// src/services/auth.js
import { apiRequest } from "./api";

export function register(user) {
  // backend expects /api/auth/register
  return apiRequest("/api/auth/register", "POST", user);
}

export function login(credentials) {
  // backend expects /api/auth/login
  return apiRequest("/api/auth/login", "POST", credentials);
}
