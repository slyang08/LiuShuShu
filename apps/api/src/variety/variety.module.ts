// apps/api-nest/src/variety/variety.module.ts
import { Module } from "@nestjs/common";

import { VarietyController } from "./variety.controller";
import { VarietyService } from "./variety.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [VarietyController],
  providers: [VarietyService],
})
export class VarietyModule {}
