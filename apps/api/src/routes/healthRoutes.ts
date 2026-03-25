// apps/api/src/routes/healthRoutes.ts
import * as healthController from "../controllers/healthController";
import { Router } from "express";

const router: Router = Router();
router.get("/", healthController.healthCheck);

export default router;
