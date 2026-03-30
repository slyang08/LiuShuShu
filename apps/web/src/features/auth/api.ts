// apps/web/src/features/auth/api.ts

export async function getMe() {
  const res = await fetch(`/api/admin/me`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function logout() {
  try {
    const res = await fetch(`/api/admin/logout`, {
      method: "POST",
    });

    if (!res.ok) throw new Error("Logout failed");
  } catch (error) {
    console.error("Logout error:", error);
  }
}
