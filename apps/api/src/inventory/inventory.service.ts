// apps/api-nest/src/inventory/inventory.service.ts
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";

import { Prisma } from "@liushushu/db";
import { CreateInventoryDTO } from "@liushushu/shared";

import { PrismaService } from "../prisma/prisma.service";

type InventoryWithItems = Prisma.InventoryGetPayload<{
  include: { items: { include: { variety: true } } };
}>;

type InventoryItemWithVariety = Prisma.InventoryItemGetPayload<{
  include: { variety: true };
}>;

const STORE_TIMEZONE = "Asia/Kuala_Lumpur";

function getTodayStoreDate(timezone: string): Date {
  const now = new Date();
  const dateStr = now.toLocaleDateString("sv", { timeZone: timezone });
  return new Date(dateStr + "T00:00:00Z");
}

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: number, dto: CreateInventoryDTO): Promise<InventoryWithItems> {
    const parsedDate = new Date(dto.date + "T00:00:00Z");

    const existing = await this.prisma.db.inventory.findUnique({
      where: { storeId_date: { storeId, date: parsedDate } },
    });

    if (existing) {
      throw new ConflictException("Inventory for this date already exists.");
    }

    return this.prisma.db.inventory.create({
      data: {
        storeId,
        date: parsedDate,
        items: {
          create: dto.items.map((item) => ({
            varietyId: item.varietyId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { variety: true } } },
    });
  }

  async findAll(storeId: number): Promise<InventoryWithItems[]> {
    return this.prisma.db.inventory.findMany({
      where: { storeId },
      orderBy: { date: "desc" },
      include: { items: { include: { variety: true } } },
    });
  }

  async findByDate(storeId: number, dateStr: string): Promise<InventoryWithItems> {
    const date = new Date(dateStr + "T00:00:00Z");

    const inventory = await this.prisma.db.inventory.findUnique({
      where: { storeId_date: { storeId, date } },
      include: { items: { include: { variety: true } } },
    });

    if (!inventory) throw new NotFoundException("Inventory not found");
    return inventory;
  }

  async findTodayPublic(storeId: number): Promise<InventoryItemWithVariety[]> {
    const today = getTodayStoreDate(STORE_TIMEZONE);

    const inventory = await this.prisma.db.inventory.findUnique({
      where: { storeId_date: { storeId, date: today } },
      include: {
        items: {
          where: { isDeleted: false, quantity: { gt: 0 } },
          include: { variety: true },
          orderBy: { variety: { name: "asc" } },
        },
      },
    });

    return inventory?.items ?? [];
  }

  async findToday(storeId: number): Promise<InventoryItemWithVariety[]> {
    const today = getTodayStoreDate(STORE_TIMEZONE);

    const inventory = await this.prisma.db.inventory.findUnique({
      where: { storeId_date: { storeId, date: today } },
      include: { items: { include: { variety: true } } },
    });

    if (!inventory) throw new NotFoundException("Today's inventory not found");
    return inventory.items;
  }

  async update(storeId: number, dto: CreateInventoryDTO): Promise<InventoryWithItems> {
    const date = new Date(dto.date + "T00:00:00Z");

    const existing = await this.prisma.db.inventory.findUnique({
      where: { storeId_date: { storeId, date } },
      include: { items: true },
    });

    if (!existing) throw new NotFoundException("Inventory not found");

    const result = await this.prisma.db.$transaction(async (tx) => {
      for (const item of dto.items) {
        await tx.inventoryItem.upsert({
          where: {
            inventoryId_varietyId: {
              inventoryId: existing.id,
              varietyId: item.varietyId,
            },
          },
          update: { quantity: item.quantity, price: item.price },
          create: {
            inventoryId: existing.id,
            varietyId: item.varietyId,
            quantity: item.quantity,
            price: item.price,
          },
        });
      }

      return tx.inventory.findUnique({
        where: { id: existing.id },
        include: { items: { include: { variety: true } } },
      });
    });

    if (!result) throw new NotFoundException("Inventory not found after update");
    return result;
  }
}
