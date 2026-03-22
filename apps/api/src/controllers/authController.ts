import { LoginInput } from "@liushushu/shared/src/auth/types";
import * as authService from "../services/authService";
import { Request, Response } from "express";

export const login = async (req: Request<unknown, unknown, LoginInput>, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.json({ token });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Logged in" });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
