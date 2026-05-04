// apps/api-nest/src/store/store.service.ts
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<unknown> {
    return this.prisma.db.store.create({ data: { name } });
  }

  async findAll(): Promise<unknown> {
    return this.prisma.db.store.findMany();
  }
}
