// apps/api/src/routes/inventoryRoutes.ts
import { Router } from "express";
import * as inventoryController from "../controllers/inventoryController";

const router: Router = Router();

router.post("/", inventoryController.createInventory);
router.put("/", inventoryController.updateInventory);  
router.get("/:storeId", inventoryController.getAllInventory);
router.get("/:storeId/today", inventoryController.getTodayInventory);
router.get("/:storeId/:date", inventoryController.getInventoryByDate);

export default router;
