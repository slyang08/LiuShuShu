// apps/api/src/controllers/varietyController.ts
import { create, getAll, getById, softDelete, update } from "../services/varietyService";

import { NextFunction, Request, Response } from "express";

export async function getAllVarieties(req: Request, res: Response, next: NextFunction) {
  try {
    const varieties = await getAll();
    res.json(varieties);
  } catch (err) {
    next(err);
  }
}

export async function getVarietyById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = await getById(Number(id));
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function createVariety(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, desc } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const variety = await create({ name, desc });
    res.status(201).json(variety);
  } catch (err) {
    next(err);
  }
}

export async function updateVariety(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, desc } = req.body;
    const data = await update(Number(id), { name, desc });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function softDeleteVariety(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = await softDelete(Number(id));
    res.json(data);
  } catch (err) {
    next(err);
  }
}
