// apps/api-nest/src/auth/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "@liushushu/shared";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const secret = config.get<string>("JWT_SECRET");

    if (!secret) {
      throw new Error("JWT_SECRET not set");
    }

    super({
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request & { cookies?: { access_token?: string } }) =>
          req.cookies?.access_token ?? null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
