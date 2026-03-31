// apps/web/src/features/auth/api.ts

export async function getMe() {
  const res = await fetch(`/api/admin/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch admin");
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function logout() {
  try {
    await fetch(`/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    window.location.href = "/admin/login";
  }
}
