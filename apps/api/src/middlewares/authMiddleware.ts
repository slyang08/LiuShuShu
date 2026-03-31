// apps/api/src/middlewares/authMiddleware.ts
import { JwtPayload } from "@liushushu/shared";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies?.access_token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.admin = decoded as JwtPayload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
