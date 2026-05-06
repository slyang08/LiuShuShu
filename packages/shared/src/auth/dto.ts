// packages/shared/src/auth/dto.ts
export interface RegisterDTO {
  email: string;
  username?: string;
  password: string;
  storeId: number;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ChangePasswordDTO {
  adminId: number;
  currentPassword: string;
  newPassword: string;
}
