// apps/api/src/routes/inventoryRoutes.ts
import * as inventoryController from "../controllers/inventoryController";
import { requireAuth } from "../middlewares/authMiddleware";
import { Router } from "express";

const router: Router = Router();

router.post("/", requireAuth, inventoryController.createInventory);
router.put("/", requireAuth, inventoryController.updateInventory);
router.get("/", inventoryController.getAllInventory);
router.get("/:storeId/today", inventoryController.getPublicTodayInventory);
router.get("/:date", inventoryController.getInventoryByDate);

export default router;
