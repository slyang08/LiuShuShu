// apps/api/src/services/authService.ts
import { JwtPayload } from "@liushushu/shared/src/auth/types";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(email: string, password: string): Promise<string> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, admin.password);

  if (!isValid) throw new Error("Invalid credentials");

  const payload: JwtPayload = {
    adminId: admin.id,
    role: admin.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "1d",
  });
}
