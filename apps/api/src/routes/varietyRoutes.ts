// apps/api/src/routes/varietyRoutes.ts
import { Router } from "express";
import { createVariety, getAllVarieties, getVarietyById, softDeleteVariety, updateVariety } from "../controllers/varietyController";

const router: Router = Router();

router.get("/", getAllVarieties);
router.post("/", createVariety);
router.get("/:id", getVarietyById);
router.patch("/:id", updateVariety);
router.delete("/:id", softDeleteVariety);

export default router;
