// apps/api/src/routes/inventoryItemRoutes.ts
import * as inventoryController from "../controllers/inventoryItemController";

import { Router } from "express";

const router: Router = Router();

router.patch("/:id", inventoryController.updateQuantity);

export default router;
