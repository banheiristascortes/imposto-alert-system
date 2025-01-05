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
} from "lucide-react";

export const AppSidebar = () => {
  const location = useLocation();

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
    <aside className="w-64 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))] min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">TaxTracker</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    "hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]",
                    location.pathname === path &&
                      "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};