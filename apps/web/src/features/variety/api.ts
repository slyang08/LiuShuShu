// apps/web/src/features/variety/api.ts
import { Variety } from "../variety/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getVarieties(): Promise<Variety[]> {
  const res = await fetch(`${BASE_URL}/varieties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch varieties");
  }

  return res.json();
}

export async function createVariety(data: {
  name: string;
  desc?: string;
}): Promise<Variety> {
  const res = await fetch(`${BASE_URL}/varieties`, {
    method: "POST",
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
