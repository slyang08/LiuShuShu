// apps/api-nest/src/auth/auth.controller.ts
import { Body, Controller, Get, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

import { ChangePasswordDTO, RegisterDTO, LoginDTO, JwtPayload } from "@liushushu/shared";

import { AuthService } from "./auth.service";
import { GetUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("admin/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDTO, @Res({ passthrough: true }) res: Response) {
    const admin = await this.authService.register(dto);

    const token = await this.authService.login(dto);

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
  async login(@Body() dto: LoginDTO, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);

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
  async changePassword(@GetUser() user: JwtPayload, @Body() dto: ChangePasswordDTO) {
    return this.authService.changePassword({ ...dto, adminId: user.adminId });
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token");
    return { message: "Logged out" };
  }
}
