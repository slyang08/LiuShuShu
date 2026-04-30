// apps/api-nest/src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { PrismaClient } from "@liushushu/db";
import { createPrismaClient } from "@liushushu/db";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient;

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    const url = this.config.get<string>("DATABASE_URL");

    if (!url) {
      throw new Error("DATABASE_URL not set");
    }

    this.client = createPrismaClient(url);

    await this.client.$connect();

    console.log("✅ Prisma initialized");
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  // proxy prisma client methods
  get db(): PrismaClient {
    return this.client;
  }

  async healthCheck() {
    await this.client.$queryRaw`SELECT 1`;
    return { db: true };
  }
}
