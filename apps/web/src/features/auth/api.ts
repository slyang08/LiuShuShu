// apps/web/src/features/auth/api.ts

export async function getMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function logout() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
