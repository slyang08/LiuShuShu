// apps/api/src/routes/storeRoutes.ts
import * as storeController from "../controllers/storeController";
import { Router } from "express";

const router: Router = Router();

router.post("/", storeController.createStore);

export default router;
