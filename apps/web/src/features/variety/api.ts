// apps/web/src/features/variety/api.ts
import { DurianVariety } from "@liushushu/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getVarieties(): Promise<DurianVariety[]> {
  const res = await fetch(`${API_URL}/admin/varieties`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    const error = (await res.json().catch(() => null)) as unknown;
    console.error("Varieties API Error:", error || res.status);
    throw new Error("Failed to fetch varieties");
  }

  const data = (await res.json()) as unknown;
  return Array.isArray(data) ? (data as DurianVariety[]) : [];
}

export async function createVariety(data: { name: string; desc?: string }): Promise<DurianVariety> {
  const res = await fetch(`${API_URL}/admin/varieties`, {
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

  return (await res.json()) as DurianVariety;
}

export async function updateVariety(
  id: number,
  data: {
    name: string;
    desc: string;
  }
): Promise<DurianVariety> {
  const res = await fetch(`${API_URL}/admin/varieties/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as DurianVariety;
}

export async function deleteVariety(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/admin/varieties/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
}
