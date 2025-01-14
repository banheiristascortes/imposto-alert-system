export interface Notification {
  id: string;
  title: string;
  description: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  date: string;
  read: boolean;
}

export type NotificationType = "info" | "warning" | "error" | "success";