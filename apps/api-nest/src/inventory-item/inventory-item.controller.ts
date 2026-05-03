// apps/api-nest/src/inventory-item/inventory-item.controller.ts
import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards } from "@nestjs/common";

import { InventoryItemService } from "./inventory-item.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("admin/inventory-items")
export class InventoryItemController {
  constructor(private readonly inventoryItemService: InventoryItemService) {}

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateQuantity(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { quantity: number }
  ): Promise<unknown> {
    return this.inventoryItemService.updateQuantity(id, body.quantity);
  }
}
