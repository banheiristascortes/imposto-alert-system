import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell } from "lucide-react";

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
  {
    id: 3,
    title: "Mudança MG",
    description: "Alteração na base de cálculo para serviços de telecomunicações",
    date: "2024-03-08",
    read: true,
  },
];

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Notificações</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                notification.read ? "bg-gray-50" : "bg-blue-50"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                <Bell className="h-5 w-5 text-primary-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  <p className="text-gray-600">{notification.description}</p>
                  <span className="text-sm text-gray-400">{notification.date}</span>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};