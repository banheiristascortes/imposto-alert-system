import { Bell } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Nova alteração em SP",
    description: "Alteração na alíquota de ICMS para serviços de dados",
    date: "2024-03-15",
    read: false,
  },
  {
    id: 2,
    title: "Atualização RJ",
    description: "Novo convênio para tributação de serviços OTT",
    date: "2024-03-10",
    read: false,
  },
];

export const NotificationBell = () => {
  const navigate = useNavigate();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold">Notificações</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/notifications")}
            >
              Ver todas
            </Button>
          </div>
          <div className="space-y-2">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-2 rounded-lg ${
                  notification.read ? "bg-gray-50" : "bg-blue-50"
                }`}
              >
                <h5 className="text-sm font-medium">{notification.title}</h5>
                <p className="text-xs text-gray-500">{notification.description}</p>
                <span className="text-xs text-gray-400">{notification.date}</span>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};