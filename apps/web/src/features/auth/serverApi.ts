// apps/web/src/features/auth/serverApi.ts
import { serverFetch } from "@/lib/serverFetch";

export async function fetchMe() {
  const res = await serverFetch("/admin/auth/me");

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
