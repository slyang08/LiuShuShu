// apps/api-nest/src/auth/auth.controller.ts
import { Body, Controller, Get, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

import { ChangePasswordInput, RegisterInput, LoginInput, JwtPayload } from "@liushushu/shared";

import { AuthService } from "./auth.service";
import { GetUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("admin/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterInput, @Res({ passthrough: true }) res: Response) {
    const admin = await this.authService.register(body.email, body.password, body.storeId);

    const token = await this.authService.login(body.email, body.password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: "Registered successfully",
      admin,
    };
  }

  @Post("login")
  async login(@Body() body: LoginInput, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(body.email, body.password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: "Logged in",
      token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getMe(@GetUser() user: JwtPayload) {
    return this.authService.getMe(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("change-password")
  async changePassword(@GetUser() user: JwtPayload, @Body() body: ChangePasswordInput) {
    return this.authService.changePassword(user.adminId, body.currentPassword, body.newPassword);
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token");
    return { message: "Logged out" };
  }
}
