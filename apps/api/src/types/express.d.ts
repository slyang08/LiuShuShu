// apps/api/src/types/express.d.ts
import type { JwtPayload } from "@liushushu/shared";

declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload;
    }
  }
}

export {};
