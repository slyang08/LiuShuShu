// apps/web/src/features/variety/api.ts
import { Variety } from "../../../../../packages/shared/src/variety/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getVarieties(): Promise<Variety[]> {
  const res = await fetch(`${BASE_URL}/admin/varieties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch varieties");
  }

  return res.json();
}

export async function createVariety(data: { name: string; desc?: string }): Promise<Variety> {
  const res = await fetch(`${BASE_URL}/admin/varieties`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create variety");
  }

  return res.json();
}

export async function updateVariety(
  id: number,
  data: {
    name: string;
    desc: string;
  }
) {
  const res = await fetch(`${BASE_URL}/admin/varieties/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteVariety(id: number) {
  const res = await fetch(`${BASE_URL}/admin/varieties/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
}
