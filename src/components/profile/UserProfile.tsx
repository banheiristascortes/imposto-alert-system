import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Camera } from "lucide-react";
import { api } from "@/services/api";

export const UserProfile = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    darkMode: false,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await api.getUserData();
        setName(userData.name);
        setEmail(userData.email);
        setAvatar(userData.avatar);
        setPreferences(userData.preferences);
      } catch (error) {
        console.error("Error loading user data:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do usuário.",
          variant: "destructive",
        });
      }
    };

    loadUserData();
  }, [toast]);

  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Perfil do Usuário</h2>
        
        <div className="mb-6 text-center">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32 mb-4">
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            </Avatar>
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer">
              <Camera className="w-4 h-4 text-white" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="seu.email@exemplo.com"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Preferências</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={preferences.emailNotifications}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked
                  }))}
                />
                <span>Receber notificações por email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={preferences.darkMode}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    darkMode: e.target.checked
                  }))}
                />
                <span>Ativar modo escuro automaticamente</span>
              </label>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Salvar Alterações
          </Button>
        </div>
      </Card>
    </div>
  );
};