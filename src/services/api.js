// src/services/api.js
import API_URL from "../config";

export async function apiRequest(endpoint, method = "GET", body) {
  const token = localStorage.getItem("token") || "";
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${API_URL}${endpoint}`; // endpoint must start with /api/...
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // try to parse body when failing to give better messages
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const json = await res.json();
      msg = json.message || JSON.stringify(json) || msg;
    } catch (e) {
      const text = await res.text().catch(() => "");
      msg = text || msg;
    }
    throw new Error(msg);
  }

  // if empty body
  if (res.status === 204) return null;
  return res.json().catch(() => null);
}
