import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";

jest.mock("bcrypt");

describe("AuthService", () => {
  let service: AuthService;

  const prismaMock = {
    db: {
      admin: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    },
  };

  const jwtMock = {
    sign: jest.fn().mockReturnValue("mock-token"),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get(AuthService);

    jest.clearAllMocks();
  });

  // =========================
  // login
  // =========================

  describe("login", () => {
    it("should throw if user not found", async () => {
      prismaMock.db.admin.findUnique.mockResolvedValue(null);

      await expect(service.login("test@test.com", "1234")).rejects.toThrow(UnauthorizedException);
    });

    it("should throw if password invalid", async () => {
      prismaMock.db.admin.findUnique.mockResolvedValue({
        id: 1,
        email: "test@test.com",
        password: "hashed",
        storeId: 1,
        role: "ADMIN",
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login("test@test.com", "wrong")).rejects.toThrow(UnauthorizedException);
    });

    it("should return token when valid", async () => {
      prismaMock.db.admin.findUnique.mockResolvedValue({
        id: 1,
        email: "test@test.com",
        password: "hashed",
        storeId: 1,
        role: "ADMIN",
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login("test@test.com", "1234");

      expect(result).toBe("mock-token");
      expect(jwtMock.sign).toHaveBeenCalled();
    });
  });

  // =========================
  // getMe
  // =========================

  describe("getMe", () => {
    it("should return payload", () => {
      const payload = {
        adminId: 1,
        email: "test@test.com",
        storeId: 1,
        role: "ADMIN",
      };

      const result = service.getMe(payload);

      expect(result).toEqual(payload);
    });
  });

  // =========================
  // changePassword
  // =========================

  describe("changePassword", () => {
    it("should throw if missing fields", async () => {
      await expect(service.changePassword(1, "", "")).rejects.toThrow(BadRequestException);
    });

    it("should throw if password too short", async () => {
      await expect(service.changePassword(1, "old", "123")).rejects.toThrow(BadRequestException);
    });

    it("should throw if admin not found", async () => {
      prismaMock.db.admin.findUnique.mockResolvedValue(null);

      await expect(service.changePassword(1, "old", "newpassword123")).rejects.toThrow(
        BadRequestException
      );
    });

    it("should update password successfully", async () => {
      prismaMock.db.admin.findUnique.mockResolvedValue({
        id: 1,
        password: "hashed",
      });

      (bcrypt.compare as jest.Mock)
        .mockResolvedValueOnce(false) // new password not same
        .mockResolvedValueOnce(true); // current password correct

      (bcrypt.hash as jest.Mock).mockResolvedValue("new-hash");

      prismaMock.db.admin.update.mockResolvedValue({});

      const result = await service.changePassword(1, "oldpass", "newpassword123");

      expect(result).toEqual({
        message: "Password updated successfully",
        forceLogout: true,
      });
    });
  });
});
