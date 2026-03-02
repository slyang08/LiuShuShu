// apps/api/src/services/varietyService.ts
import { prisma } from "../lib/prisma";

export const varietyService = {
  async getAll() {
    return prisma.durianVariety.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        desc: true,
        isActive: true,
      },
    });
  },

  async getById(id: number) {
    return prisma.durianVariety.findUnique({
      where: { id },
      include: { items: true },
    });
  },

  async create(data: { name: string, desc?: string }) {
    return prisma.durianVariety.create({
      data,
      select: {
        id: true,
        name: true,
        desc: true,
        isActive: true,
      },
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
