// apps/api/src/services/inventoryService.ts
import { prisma } from "../lib/prisma";
import { CreateInventoryDTO } from "@liushushu/shared";

export async function createInventory(data: CreateInventoryDTO) {
  const { storeId, date, items } = data;
  const parsedDate = new Date(date + "T00:00:00Z");

  const existing = await prisma.inventory.findUnique({
    where: {
      storeId_date: {
        storeId,
        date: parsedDate
      }
    },
  });

  if (existing) {
    throw new Error("Inventory for this date already exists.");
  }

  return prisma.inventory.create({
    data: {
      storeId,
      date: parsedDate,
      items: {
        create: items.map((item) => ({
          varietyId: item.varietyId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          variety: true
        }
      },
    },
  });
}

export async function getInventoryByDate(storeId: number, date: Date) {
  return prisma.inventory.findUnique({
    where: {
      storeId_date: {
        storeId,
        date,
      }
    },
    include: {
      items: {
        include: {
          variety: true
        }
      },
    },
  });
}

export async function getInventories(storeId: number) {
  return prisma.inventory.findMany({
    where: {
      storeId
    },
    orderBy: {
      date: "desc"
    },
    include: {
      items: {
        include: {
          variety: true
        }
      },
    },
  });
}
