import { useState } from "react";
import { User, UserCredentials, UserRole } from "@/types/user";
import { useToast } from "./use-toast";
import { api } from "@/services/api";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = async (credentials: UserCredentials) => {
    try {
      console.log("Attempting login with credentials:", credentials);
      const userData = await api.getUserByEmail(credentials.email);
      
      if (credentials.email === userData.email && credentials.password === userData.password) {
        const mockUser: User = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role as UserRole,
        };
        setUser(mockUser);
        console.log("Login successful, user data:", mockUser);
        return true;
      }
      console.log("Login failed: Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao tentar fazer login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
};