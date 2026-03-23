// apps/api/src/types/express.d.ts
import type { JwtPayload } from "@liushushu/shared";
import "express";

// 確保擴展了 express 的 namespace

declare module "express" {
  interface Request {
    admin?: JwtPayload;
  }
}
