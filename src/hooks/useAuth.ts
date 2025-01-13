import { useState, useEffect } from "react";
import { User, UserCredentials } from "@/types/user";
import { useToast } from "./use-toast";
import { sessionManager } from "@/utils/sessionManager";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(sessionManager.getUser());
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar a sessão a cada minuto
    const sessionCheck = setInterval(() => {
      if (!sessionManager.checkSession()) {
        setUser(null);
        navigate('/');
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. Por favor, faça login novamente.",
          variant: "destructive",
        });
      }
    }, 60000);

    // Atualizar última atividade quando houver interação
    const updateActivity = () => {
      if (user) {
        sessionManager.updateLastActivity();
      }
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      clearInterval(sessionCheck);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, [user, navigate, toast]);

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
        sessionManager.startSession(mockUser);
        console.log('Login successful:', mockUser);
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
    sessionManager.endSession();
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
};