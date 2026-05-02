// apps/api-nest/src/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
