export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers = new Headers(options.headers);

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  return fetch(url, { ...options, headers });
}
