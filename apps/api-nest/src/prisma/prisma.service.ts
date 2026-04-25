// apps/api-nest/src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { PrismaClient } from "@liushushu/db";
import { createPrismaClient } from "@liushushu/db";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma!: PrismaClient;

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    const url = this.config.get<string>("DATABASE_URL")!;

    this.prisma = createPrismaClient(url);

    await this.prisma.$connect();

    console.log("✅ Prisma initialized");
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  async healthCheck() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { db: true };
  }
}
