export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export type UserRole = "USER" | "ADMIN";

// User data without password (for API responses and req.user)
export interface UserWithoutPassword {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}
