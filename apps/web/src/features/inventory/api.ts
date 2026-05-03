// apps/web/src/features/inventory/api.ts
import { CreateInventoryDTO, Inventory, InventoryItem } from "@liushushu/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createInventory(data: CreateInventoryDTO): Promise<Inventory> {
  const res = await fetch(`${API_URL}/admin/inventories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = (await res.json()) as { message?: string };
    throw new Error(error.message ?? "Failed to create inventory");
  }

  return (await res.json()) as Inventory;
}

export async function getInventories(): Promise<Inventory[]> {
  const res = await fetch(`${API_URL}/admin/inventories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch inventories");
  return (await res.json()) as Inventory[];
}

export async function getAdminTodayInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`${API_URL}/admin/inventories/today`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("今日庫存載入失敗");
  return (await res.json()) as InventoryItem[];
}

export async function getPublicTodayInventory(storeId: number): Promise<InventoryItem[]> {
  try {
    const res = await fetch(`${API_URL}/inventories/${storeId}/today`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    const inventory = (await res.json()) as unknown;
    return Array.isArray(inventory) ? (inventory as InventoryItem[]) : [];
  } catch (err) {
    console.error("Public inventory error:", err);
    return [];
  }
}

export async function getInventoryByDate(date: Date): Promise<Inventory> {
  const res = await fetch(`${API_URL}/admin/inventories/${date.toISOString().split("T")[0]}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return (await res.json()) as Inventory;
}

export async function updateInventory(data: CreateInventoryDTO): Promise<Inventory> {
  const res = await fetch(`${API_URL}/admin/inventories`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = (await res.json()) as { message?: string };
    throw new Error(error.message ?? "Failed to update inventory");
  }

  return (await res.json()) as Inventory;
}

export async function updateInventoryItem(
  itemId: number,
  data: { quantity: number; price: number }
): Promise<InventoryItem> {
  const res = await fetch(`${API_URL}/admin/inventory-items/${itemId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update item");

  return (await res.json()) as InventoryItem;
}
