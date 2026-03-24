// apps/web/src/features/auth/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getMe() {
  const res = await fetch(`${API_URL}/admin/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function logout() {
  await fetch(`${API_URL}/admin/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
