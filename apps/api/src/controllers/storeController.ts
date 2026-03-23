// apps/api/src/controllers/storeController.ts
import * as storeService from "../services/storeService";
import { Request, Response } from "express";

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const store = await storeService.createStore(name);
    res.json(store);
  } catch (error) {
    res.status(400).json("Failed to create store");
  }
};
