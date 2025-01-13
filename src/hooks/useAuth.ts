import { useState } from "react";
import { User, UserCredentials } from "@/types/user";
import { useToast } from "./use-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = async (credentials: UserCredentials) => {
    try {
      // This is a mock implementation - replace with actual API call
      if (credentials.email === "matheush@kyros.com.br" && credentials.password === "Emp@193057") {
        const mockUser: User = {
          id: "1",
          email: credentials.email,
          name: "Matheus",
          role: "admin",
        };
        setUser(mockUser);
        return true;
      }
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