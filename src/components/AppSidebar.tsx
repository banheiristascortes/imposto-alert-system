import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart, label: "Análise", path: "/analysis" },
    { icon: Bell, label: "Notificações", path: "/notifications" },
    { icon: Settings, label: "Configurações", path: "/settings" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-white border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-semibold">Menu</span>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="p-2 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              collapsed ? "px-2" : "px-4"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </Button>
        ))}
      </nav>
    </div>
  );
};