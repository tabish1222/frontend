import API_URL from "../config";

export async function apiRequest(endpoint, method = "GET", body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "API error" }));
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}
