export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type UserRole = "admin" | "user" | "viewer";

export interface UserCredentials {
  email: string;
  password: string;
}