// apps/api/src/routes/varietyRoutes.ts
import * as varietyController from "../controllers/varietyController";

import { Router } from "express";

const router: Router = Router();

router.get("/", varietyController.getAllVarieties);
router.post("/", varietyController.createVariety);
router.get("/:id", varietyController.getVarietyById);
router.patch("/:id", varietyController.updateVariety);
router.delete("/:id", varietyController.softDeleteVariety);

export default router;
