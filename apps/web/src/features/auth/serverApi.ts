// apps/web/src/features/auth/serverApi.ts
export async function fetchMe(token: string) {
  const res = await fetch("https://liushushu-api-latest.onrender.com/admin/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
