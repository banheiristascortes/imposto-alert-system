import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bell,
  User,
  Settings,
  HelpCircle,
  FileText,
  BarChart,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const AppSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Bell, label: "Notificações", path: "/notifications" },
    { icon: User, label: "Perfil", path: "/profile" },
    { icon: BarChart, label: "Relatórios", path: "/reports" },
    { icon: FileText, label: "Documentação", path: "/docs" },
    { icon: HelpCircle, label: "Ajuda", path: "/help" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "transition-all duration-300 ease-in-out bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))] min-h-screen relative",
        isCollapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-border))] z-50 rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="p-6">
        <h1 
          className={cn(
            "font-bold mb-8 text-[hsl(var(--sidebar-accent))] transition-all duration-300",
            isCollapsed ? "text-xl" : "text-2xl"
          )}
        >
          {isCollapsed ? "TT" : "TaxTracker"}
        </h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]",
                    location.pathname === path
                      ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] shadow-sm"
                      : "text-[hsl(var(--sidebar-foreground))] hover:translate-x-1"
                  )}
                  title={isCollapsed ? label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span 
                    className={cn(
                      "font-medium whitespace-nowrap transition-all duration-300",
                      isCollapsed && "hidden"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};