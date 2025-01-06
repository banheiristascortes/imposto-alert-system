import { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Atualização ICMS",
    message: "Nova alteração na legislação do ICMS em São Paulo",
    type: "info",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Alerta Fiscal",
    message: "Prazo de adequação às novas regras se encerra em 30 dias",
    type: "warning",
    createdAt: new Date().toISOString(),
    read: false,
  },
];