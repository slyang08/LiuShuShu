// apps/api-nest/src/auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

import { JwtPayload } from "@liushushu/shared";

export const GetUser = createParamDecorator((_: unknown, ctx: ExecutionContext): JwtPayload => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return req.user as JwtPayload;
});
