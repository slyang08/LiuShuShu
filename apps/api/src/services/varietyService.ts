// apps/api/src/services/varietyService.ts
import { prisma } from "../lib/prisma";

export async function getAll() {
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
}

export async function getById(id: number) {
  return prisma.durianVariety.findUnique({
    where: { id },
    include: { items: true },
  });
}

export async function create(data: { name: string; desc?: string }) {
  return prisma.durianVariety.create({
    data,
    select: {
      id: true,
      name: true,
      desc: true,
      isActive: true,
    },
  });
}

export async function update(id: number, data: { name?: string; desc?: string }) {
  return prisma.durianVariety.update({
    where: { id },
    data,
  });
}

export async function softDelete(id: number) {
  return prisma.durianVariety.update({
    where: { id },
    data: { isActive: false },
  });
}
