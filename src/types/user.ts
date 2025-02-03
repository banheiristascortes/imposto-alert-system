export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type UserRole = "admin" | "user" | "viewer" | "guest";

export interface UserCredentials {
  email: string;
  password: string;
}


export interface UserPreferences {
  emailNotifications: boolean;
  darkMode: boolean;
}
export interface UserData extends User {
  password: string;
  preferences: UserPreferences;
  avatar: string;
}