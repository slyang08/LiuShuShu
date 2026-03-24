// apps/api/src/routes/authRoutes.ts
import { requireAuth } from "../middlewares/authMiddleware";
import * as authController from "./../controllers/authController";
import { Router } from "express";

const router: Router = Router();

router.post("/me", requireAuth, authController.getMe);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

export default router;
