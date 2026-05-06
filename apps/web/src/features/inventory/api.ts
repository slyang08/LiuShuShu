// apps/web/src/features/inventory/api.ts
import {
  CreateInventoryDTO,
  Inventory,
  InventoryItem,
  UpdateInventoryItemDTO,
} from "@liushushu/shared";

export async function createInventory(data: CreateInventoryDTO): Promise<Inventory> {
  const res = await fetch(`/api/admin/inventories`, {
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
  const res = await fetch(`/api/admin/inventories`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch inventories");
  return (await res.json()) as Inventory[];
}

export async function getAdminTodayInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`/api/admin/inventories/today`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("今日庫存載入失敗");
  return (await res.json()) as InventoryItem[];
}

export async function getPublicTodayInventory(storeId: number): Promise<InventoryItem[]> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/admin/inventories/${storeId}/today`, {
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
  const res = await fetch(`/api/admin/inventories/${date.toISOString().split("T")[0]}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return (await res.json()) as Inventory;
}

export async function updateInventory(data: CreateInventoryDTO): Promise<Inventory> {
  const res = await fetch(`/api/admin/inventories`, {
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
  data: UpdateInventoryItemDTO
): Promise<InventoryItem> {
  const res = await fetch(`/api/admin/inventory-items/${itemId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update item");

  return (await res.json()) as InventoryItem;
}
