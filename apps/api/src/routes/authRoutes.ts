// apps/api/src/routes/authRoutes.ts
import { requireAuth } from "../middlewares/authMiddleware";
import * as authController from "./../controllers/authController";
import { Router } from "express";

const router: Router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", requireAuth, authController.getMe);
router.patch("/change-password", requireAuth, authController.changePassword);
router.post("/logout", authController.logout);

export default router;
