// apps/api-nest/src/inventory-item/inventory-item.module.ts
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";

import { InventoryItemController } from "./inventory-item.controller";
import { InventoryItemService } from "./inventory-item.service";

@Module({
  imports: [PrismaModule],
  providers: [InventoryItemService],
  controllers: [InventoryItemController],
})
export class InventoryItemModule {}
