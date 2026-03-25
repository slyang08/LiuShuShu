// packages/shared/src/auth/types.ts
export interface JwtPayload {
  adminId: number;
  email: string;
  storeId: number;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  username?: string;
  password: string;
  storeId: number;
}
