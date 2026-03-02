// apps/api/src/controllers/varietyController.ts
import { Request, Response, NextFunction } from "express";
import { varietyService } from "../services/varietyService";

export const varietyController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const varieties = await varietyService.getAll();
      res.json(varieties);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await varietyService.getById(Number(id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, desc } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }      

      const variety = await varietyService.create({ name, desc });
      res.status(201).json(variety);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, desc } = req.body;
      const data = await varietyService.update(Number(id), { name, desc });
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await varietyService.softDelete(Number(id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};
