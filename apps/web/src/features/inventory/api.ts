// apps/web/src/features/inventory/api.ts
import { CreateInventoryDTO } from "@liushushu/shared";
import { InventoryItem } from "./hooks/useTodayInventory";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createInventory(data: CreateInventoryDTO) {
  const res = await fetch(`${BASE_URL}/admin/inventories`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create inventory");
  }

  return res.json();
}

export async function getInventories() {
  const res = await fetch(`${BASE_URL}/admin/inventories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch inventories");
  return res.json();
}

export async function getTodayInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`${BASE_URL}/admin/inventories/today`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("今日庫存載入失敗");
  return res.json();
}

export async function getInventoryByDate(date: Date) {
  const res = await fetch(`${BASE_URL}/admin/inventories/${date.toISOString().split("T")[0]}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

export async function updateInventoryItem(
  itemId: number,
  data: { quantity: number; price: number }
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/inventory-items/${itemId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update item");

  return res.json();
}
