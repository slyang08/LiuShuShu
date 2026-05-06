// apps/api-nest/src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { JwtPayload, RegisterDTO, LoginDTO, ChangePasswordDTO } from "@liushushu/shared";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not set");
    }
    return secret;
  }

  async register(dto: RegisterDTO) {
    const store = await this.prisma.db.store.findUnique({
      where: { id: dto.storeId },
    });

    if (!store) {
      throw new BadRequestException("Invalid store");
    }

    if (!dto.email || !dto.password) {
      throw new BadRequestException("Missing required fields");
    }

    if (dto.password.length < 8) {
      throw new BadRequestException("Password must be at least 8 characters");
    }

    const existing = await this.prisma.db.admin.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    return this.prisma.db.admin.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        storeId: dto.storeId,
      },
    });
  }

  async login(dto: LoginDTO): Promise<string> {
    const admin = await this.prisma.db.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin) throw new UnauthorizedException("Invalid credentials");

    const isValid = await bcrypt.compare(dto.password, admin.password);
    if (!isValid) throw new UnauthorizedException("Invalid credentials");

    const payload: JwtPayload = {
      adminId: admin.id,
      storeId: admin.storeId,
      email: admin.email,
      role: admin.role,
    };

    return this.jwtService.sign(payload, { secret: this.getJwtSecret(), expiresIn: "1d" });
  }

  getMe(payload: JwtPayload) {
    return payload;
  }

  async changePassword(dto: ChangePasswordDTO) {
    if (!dto.currentPassword || !dto.newPassword) {
      throw new BadRequestException("Missing required fields");
    }

    if (dto.newPassword.length < 8) {
      throw new BadRequestException("Password must be at least 8 characters");
    }

    const admin = await this.prisma.db.admin.findUnique({
      where: { id: dto.adminId },
    });

    if (!admin) {
      throw new BadRequestException("Admin not found");
    }

    const isSame = await bcrypt.compare(dto.newPassword, admin.password);
    if (isSame) {
      throw new BadRequestException("New password must be different");
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException("Current password incorrect");
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.db.admin.update({
      where: { id: dto.adminId },
      data: { password: hashedPassword },
    });

    return {
      message: "Password updated successfully",
      forceLogout: true,
    };
  }
}
