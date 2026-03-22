// apps/api/src/routes/inventoryItemRoutes.ts
import * as inventoryController from "../controllers/inventoryItemController";
import { requireAuth } from "../middlewares/authMiddleware";
import { Router } from "express";

const router: Router = Router();

router.patch("/:id", requireAuth, inventoryController.updateQuantity);

export default router;
