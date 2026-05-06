// apps/web/src/features/auth/serverApi.ts
import type { JwtPayload } from "@liushushu/shared";

import { serverFetch } from "@/lib/serverFetch";

export async function fetchMe(): Promise<JwtPayload> {
  const res = await serverFetch("/admin/auth/me");

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return (await res.json()) as JwtPayload;
}
