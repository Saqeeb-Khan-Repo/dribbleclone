// api/auth.js
// const BASE_URL = "https://dribblebackend-2ddd.onrender.com";
const BASE_URL = "https://dribblebackend-44al.vercel.app";

export async function registerRequest(payload) {
  const res = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Register failed");
  }
  return data;
}

export async function loginRequest(payload) {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }
  return data; // { message, success, accessKey }
}
