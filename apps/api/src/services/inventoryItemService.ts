// apps/api/src/services/inventoryItemService.ts
import { prisma } from "../lib/prisma";

export async function updateInventoryItemQuantity(itemId: number, quantity: number) {
  return prisma.inventoryItem.update({
    where: { id: itemId },
    data: { quantity },
  });
}
