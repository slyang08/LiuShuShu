import * as authController from "./../controllers/authController";
import { Router } from "express";

const router: Router = Router();

router.post("/login", authController.login);

export default router;
