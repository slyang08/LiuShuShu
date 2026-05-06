// packages/shared/src/auth/types.ts
export interface JwtPayload {
  adminId: number;
  email: string;
  storeId: number;
  role: string;
}
