// apps/api/src/controllers/authController.ts
import { LoginInput, RegisterInput } from "@liushushu/shared/src/auth/types";
import * as authService from "../services/authService";
import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  if (!req.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({
    adminId: req.admin.adminId,
    storeId: req.admin.storeId,
    email: req.admin.email,
    role: req.admin.role,
  });
};

export const login = async (req: Request<unknown, unknown, LoginInput>, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.FRONTEND_URL !== "http://localhost:3000" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in successfully",
      token,
      admin: { email },
      redirectUrl: `${process.env.FRONTEND_URL}/admin/inventories`,
    });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const register = async (req: Request<unknown, unknown, RegisterInput>, res: Response) => {
  try {
    const { email, username, password, storeId } = req.body;

    // Basic validation to ensure required fields are present
    if (!email || !password || !storeId) {
      return res.status(400).json({ message: "Email, password and storeId are required" });
    }

    const token = await authService.register({ email, password, storeId });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Admin registered successfully",
      token,
      admin: {
        // Can return additional admin information (excluding the password)
        id: req.body.email,
        email: req.body.email,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  // Clean ACCESS_TOKEN from cookie
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({ message: "Logged out" });
};
