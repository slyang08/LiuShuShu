// apps/web/src/features/auth/api.ts
import { JwtPayload } from "@liushushu/shared";

export async function login(email: string, password: string): Promise<{ message: string }> {
  const res = await fetch(`/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json().catch(() => ({}))) as { message?: string };

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data as { message: string };
}

export async function getMe(): Promise<JwtPayload> {
  const res = await fetch(`/api/admin/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch admin");
  return (await res.json()) as JwtPayload;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const res = await fetch(`/api/auth/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!res.ok) {
    const error = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(error.message ?? "Failed to change password");
  }
}

export async function logout(): Promise<void> {
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
