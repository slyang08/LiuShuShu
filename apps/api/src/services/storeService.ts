// apps/api/src/services/storeService.ts
import { prisma } from "../lib/prisma";

export async function createStore(name: string) {
  return prisma.store.create({
    data: { name },
  });
}

export async function getStores() {
  return prisma.store.findMany();
}
