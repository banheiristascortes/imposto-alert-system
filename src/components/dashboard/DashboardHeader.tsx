import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "../NotificationBell";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-primary-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Fiscal</h1>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};