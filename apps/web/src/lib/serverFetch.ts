// apps/web/src/lib/serverFetch.ts
import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res;
}
