// apps/api-nest/src/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { InventoryModule } from "./inventory/inventory.module";
import { InventoryItemModule } from "./inventory-item/inventory-item.module";
import { StoreModule } from "./store/store.module";
import { VarietyModule } from "./variety/variety.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    HealthModule,
    AuthModule,
    VarietyModule,
    InventoryModule,
    InventoryItemModule,
    StoreModule,
  ],
})
export class AppModule {}
