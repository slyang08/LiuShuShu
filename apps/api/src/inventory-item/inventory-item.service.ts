// apps/api-nest/src/inventory-item/inventory-item.service.ts
import { Injectable } from "@nestjs/common";

import { UpdateInventoryItemDTO } from "@liushushu/shared";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InventoryItemService {
  constructor(private prisma: PrismaService) {}

  async updateItem(itemId: number, dto: UpdateInventoryItemDTO): Promise<unknown> {
    return this.prisma.db.inventoryItem.update({
      where: { id: itemId },
      data: {
        quantity: dto.quantity,
        price: dto.price,
      },
    });
  }
}
