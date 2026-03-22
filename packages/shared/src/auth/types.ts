// packages/shared/src/auth/types.ts
export interface JwtPayload {
  adminId: Number;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Express.Request {
  admin?: JwtPayload;
}
