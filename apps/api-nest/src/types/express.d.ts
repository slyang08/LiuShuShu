// src/types/express.d.ts
import { JwtPayload } from "@liushushu/shared";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
