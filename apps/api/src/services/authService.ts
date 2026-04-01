// apps/api/src/services/authService.ts
import { ChangePasswordInput, JwtPayload, RegisterInput } from "@liushushu/shared/src/auth/types";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    email: admin.email,
    role: admin.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "1d",
  });
}

export async function login(email: string, password: string): Promise<string> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) throw new Error("Invalid credentials");

  console.log("input password:", password);
  console.log("hash:", admin.password);

  const isValid = await bcrypt.compare(password, admin.password);
  console.log("isValid:", isValid);

  if (!isValid) throw new Error("Invalid credentials");

  const payload: JwtPayload = {
    adminId: admin.id,
    storeId: admin.storeId,
    email: admin.email,
    role: admin.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "1d",
  });

  console.log("🟢 LOGIN TOKEN:", token);
  console.log("🟢 LOGIN SECRET:", process.env.JWT_SECRET);

  return token;
}

export async function changePassword({
  adminId,
  currentPassword,
  newPassword,
}: ChangePasswordInput) {
  // Passwords validation
  if (!currentPassword || !newPassword) {
    throw {
      status: 400,
      message: "Missing required fields",
    };
  }

  if (newPassword.length < 8) {
    throw {
      status: 400,
      message: "Password must be at least 8 characters",
    };
  }

  // Finds admin
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    throw {
      status: 404,
      message: "Admin not found",
    };
  }

  // Validate the old password
  const isSame = await bcrypt.compare(newPassword, admin.password);
  if (isSame) {
    throw {
      status: 401,
      message: "New password must be different",
    };
  }

  // Validate the old password
  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  if (!isMatch) {
    throw {
      status: 401,
      message: "Current password is incorrect",
    };
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.admin.update({
    where: { id: adminId },
    data: { password: hashedPassword },
  });

  return {
    message: "Password updated successfully",
    forceLogout: true,
  };
}
