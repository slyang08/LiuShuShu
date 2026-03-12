// apps/api/src/controllers/inventoryItemController.ts
import * as service from "../services/inventoryItemService";

import { Request, Response } from "express";

export async function updateQuantity(req: Request, res: Response) {
  try {
    const itemId = Number(req.params.id);
    const { quantity } = req.body;

    if (isNaN(itemId)) {
      return res.status(400).json({ message: "Invalid item id" });
    }

    const updated = await service.updateInventoryItemQuantity(itemId, Number(quantity));

    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
