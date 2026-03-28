export type ActivityType =
  | "report_created"
  | "client_updated"
  | "notification_sent"
  | "health_changed";

export interface ActivityRecord {
  id: string;
  workspaceId: string;
  clientId?: string;
  title: string;
  description: string;
  type: ActivityType;
  createdAt: string;
}