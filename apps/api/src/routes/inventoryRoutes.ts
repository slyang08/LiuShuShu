// apps/api/src/routes/inventoryRoutes.ts
import { Router } from "express";
import * as inventoryController from "../controllers/inventoryController";

const router: Router = Router();

router.post("/", inventoryController.createInventory);
router.get("/:storeId/:date", inventoryController.getInventoryByDate);
router.get("/:storeId", inventoryController.getAllInventory);

export default router;
