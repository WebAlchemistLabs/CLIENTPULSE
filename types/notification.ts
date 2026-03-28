export interface NotificationRecord {
  id: string;
  workspaceId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}