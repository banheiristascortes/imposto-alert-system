import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserRound, Lock } from "lucide-react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "matheush@kyros.com.br" && password === "Emp@193057") {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema de acompanhamento fiscal.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#38977f]/10 to-[#38977f]/30">
      <div className="bg-white p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full max-w-md animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#38977f] rounded-full flex items-center justify-center mb-4">
            <UserRound className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Sistema de Acompanhamento Fiscal
          </h2>
          <p className="text-gray-600 mt-2">Faça login para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#38977f] hover:bg-[#2c7361] transition-colors"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};