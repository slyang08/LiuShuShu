// apps/api/src/services/authService.ts
import { JwtPayload, RegisterInput } from "@liushushu/shared/src/auth/types";
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
    storeId: admin.storeId,
    role: admin.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "1d",
  });
}

export async function register(data: RegisterInput): Promise<string> {
  // Check if the store exists
  const store = await prisma.store.findUnique({
    where: { id: data.storeId },
  });
  if (!store) {
    throw new Error("Store not found");
  }

  // Check if the email address already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: data.email },
  });
  if (existingAdmin) {
    throw new Error("Email already exists");
  }

  // Check if the username already exists (if a username is provided)
  if (data.username) {
    const existingUsername = await prisma.admin.findUnique({
      where: { username: data.username },
    });
    if (existingUsername) {
      throw new Error("Username already exists");
    }
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 12);

  // Create an Admin
  const admin = await prisma.admin.create({
    data: {
      email: data.email,
      password: hashedPassword,
      storeId: data.storeId,
    },
  });

  // Generate JWT
  const payload: JwtPayload = {
    adminId: admin.id,
    storeId: admin.storeId,
    role: admin.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "1d",
  });
}
