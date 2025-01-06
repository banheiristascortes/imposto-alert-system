import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "../NotificationBell";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-[hsl(var(--header-background))] text-[hsl(var(--header-foreground))] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Fiscal</h1>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="bg-white hover:bg-gray-100 text-[hsl(var(--header-background))] hover:text-[hsl(var(--header-background))] border-white"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};