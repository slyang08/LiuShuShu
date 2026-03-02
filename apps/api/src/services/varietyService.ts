// apps/api/src/services/varietyService.ts
import { prisma } from "../lib/prisma";

export const varietyService = {
  async getAll() {
    return prisma.durianVariety.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: number) {
    return prisma.durianVariety.findUnique({
      where: { id },
      include: { items: true },
    });
  },

  async create(name: string, desc?: string) {
    return prisma.durianVariety.create({
      data: { name, desc: desc ?? null },
    });
  },

  async update(id: number, data: { name?: string; desc?: string }) {
    return prisma.durianVariety.update({
      where: { id },
      data,
    });
  },

  async softDelete(id: number) {
    return prisma.durianVariety.update({
      where: { id },
      data: { isActive: false },
    });
  },
};
