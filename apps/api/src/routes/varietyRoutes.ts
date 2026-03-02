// apps/api/src/routes/varietyRoutes.ts
import { Router } from "express";
import { varietyController } from "../controllers/varietyController";

const router: Router = Router();

router.get("/", varietyController.getAll);
router.post("/", varietyController.create);
router.get("/:id", varietyController.getById);
router.patch("/:id", varietyController.update);
router.delete("/:id", varietyController.softDelete);

export default router;
