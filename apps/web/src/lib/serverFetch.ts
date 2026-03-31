// apps/web/src/lib/serverFetch.ts
import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers = new Headers(options.headers);

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Auto fill JSON
  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
    options.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  return res;
}
