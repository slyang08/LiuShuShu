// apps/api/src/controllers/inventoryController.ts
import * as inventoryService from "../services/inventoryService";

import { NextFunction, Request, Response } from "express";

export async function createInventory(req: Request, res: Response) {
  try {
    const { storeId, date, items } = req.body;

    const inventory = await inventoryService.createInventory({
      storeId,
      date,
      items,
    });

    res.status(201).json(inventory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function getAllInventory(req: Request, res: Response, next: NextFunction) {
  try {
    const storeId = Number(req.params.storeId);
    const inventories = await inventoryService.getInventories(storeId);
    res.json(inventories);
  } catch (error) {
    next(error);
  }
}

export async function getInventoryByDate(req: Request, res: Response, next: NextFunction) {
  try {
    const storeId = Number(req.params.storeId);
    const dateString = req.params.date;
    const date = new Date(dateString + "T00:00:00Z");
    const inventory = await inventoryService.getInventoryByDate(storeId, date);

    if (!inventory) return res.status(404).json({ message: "Inventory not found" });
    res.json(inventory);
  } catch (error) {
    next(error);
  }
}

export async function getTodayInventory(req: Request, res: Response, next: NextFunction) {
  try {
    const storeId = Number(req.params.storeId);
    const items = await inventoryService.getTodayInventory(storeId);
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function updateInventory(req: Request, res: Response) {
  try {
    const { storeId, date, items } = req.body;
    const parsedDate = new Date(date + "T00:00:00Z");
    const inventory = await inventoryService.updateInventory(storeId, parsedDate, items);
    res.json(inventory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
