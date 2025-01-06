export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
}

export type NotificationType = "info" | "warning" | "error" | "success";