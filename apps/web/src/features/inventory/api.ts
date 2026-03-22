// apps/web/src/features/inventory/api.ts
import { CreateInventoryDTO } from "@liushushu/shared";
import { InventoryItem } from "@liushushu/shared/inventory/types";

export async function createInventory(data: CreateInventoryDTO) {
<<<<<<< HEAD
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/inventories`, {
=======
  const res = await fetch(`${BASE_URL}/admin/inventories`, {
>>>>>>> 88510b6 (feat: add login auth for admin (#27))
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

<<<<<<< HEAD
export async function getInventories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/inventories`, {
=======
export async function getInventories(storeId: number) {
  const res = await fetch(`${BASE_URL}/admin/inventories/${storeId}`, {
>>>>>>> 88510b6 (feat: add login auth for admin (#27))
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch inventories");
  return res.json();
}

export async function getAdminTodayInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/inventories/today`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("今日庫存載入失敗");
  return res.json();
}

export async function getPublicTodayInventory(storeId: number): Promise<InventoryItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventories/${storeId}/today`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    const inventory = await res.json();
    return Array.isArray(inventory) ? inventory : [];
  } catch (err) {
    console.error("Public inventory error:", err);
    return [];
  }
}

export async function getInventoryByDate(date: Date) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/inventories/${date.toISOString().split("T")[0]}`,
    {
      cache: "no-store",
    }
  );
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
