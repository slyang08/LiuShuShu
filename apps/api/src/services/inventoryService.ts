// apps/api/src/services/inventoryService.ts
import { prisma } from "../lib/prisma";
import { getTodayStoreDate } from "../lib/timezone";
import { CreateInventoryDTO, CreateInventoryItemDTO } from "@liushushu/shared";

export async function createInventory(data: CreateInventoryDTO) {
  const { storeId, date, items } = data;
  const parsedDate = new Date(date);

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

export async function getTodayInventory(storeId: number) {
  const today = getTodayStoreDate("Asia/Kuala_Lumpur");

  const inventory = await prisma.inventory.findUnique({
    where: {
      storeId_date: {
        storeId,
        date: today
      }
    },
    include: {
      items: {
        where: {
          isDeleted: false,
          quantity: { gt: 0 }
        },
        include: {
          variety: true
        },
        orderBy: {
          variety: {
            name: "asc"
          }
        }
      }
    }
  });

  return inventory?.items ?? [];
}

export async function updateInventory(storeId: number, date: Date, items: CreateInventoryItemDTO[]) {
  const existing = await prisma.inventory.findUnique({
    where: { storeId_date: { storeId, date } },
    include: { items: true }
  });
  
  if (!existing) throw new Error("Inventory not found");
  
  return prisma.$transaction(async (tx) => {
    // Update/Add items
    for (const item of items) {
      await tx.inventoryItem.upsert({
        where: {
          inventoryId_varietyId: {
            inventoryId: existing.id,
            varietyId: item.varietyId
          }
        },
        update: { quantity: item.quantity, price: item.price },
        create: {
          inventoryId: existing.id,
          varietyId: item.varietyId,
          quantity: item.quantity,
          price: item.price
        }
      });
    }
    
    return tx.inventory.findUnique({
      where: { id: existing.id },
      include: { items: { include: { variety: true } } }
    });
  });
}
