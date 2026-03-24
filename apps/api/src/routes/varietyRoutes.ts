// apps/api/src/routes/varietyRoutes.ts
import * as varietyController from "../controllers/varietyController";
import { requireAuth } from "../middlewares/authMiddleware";
import { Router } from "express";

const router: Router = Router();

router.get("/", varietyController.getAllVarieties);
router.post("/", requireAuth, varietyController.createVariety);
router.get("/:id", varietyController.getVarietyById);
router.patch("/:id", requireAuth, varietyController.updateVariety);
router.delete("/:id", requireAuth, varietyController.softDeleteVariety);

export default router;
