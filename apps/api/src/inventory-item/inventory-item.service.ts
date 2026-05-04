// apps/api-nest/src/inventory-item/inventory-item.service.ts
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InventoryItemService {
  constructor(private prisma: PrismaService) {}

  async updateQuantity(itemId: number, quantity: number): Promise<unknown> {
    return this.prisma.db.inventoryItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }
}
