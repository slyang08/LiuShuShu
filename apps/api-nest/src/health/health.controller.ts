// apps/api-nest/src/health/health.controller.ts
import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  root() {
    return { ok: true };
  }

  @Get("db")
  async db() {
    return this.prisma.healthCheck();
  }
}
