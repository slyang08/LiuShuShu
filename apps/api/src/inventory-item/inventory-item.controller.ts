// apps/api-nest/src/inventory-item/inventory-item.controller.ts
import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards } from "@nestjs/common";

import { UpdateInventoryItemDTO } from "@liushushu/shared";

import { InventoryItemService } from "./inventory-item.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("admin/inventory-items")
export class InventoryItemController {
  constructor(private readonly inventoryItemService: InventoryItemService) {}

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateItem(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateInventoryItemDTO
  ): Promise<unknown> {
    return this.inventoryItemService.updateItem(id, body);
  }
}
