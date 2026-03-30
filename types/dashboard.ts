export interface DashboardMetric {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  trend?: "up" | "down" | "neutral";
  icon: "revenue" | "clients" | "projects" | "conversion" | "leads" | "growth";
}

export interface DashboardOverview {
  workspaceId: string;
  totalRevenue: number;
  activeClients: number;
  activeProjects: number;
  conversionRate: number;
  metrics: DashboardMetric[];
}

export interface NotificationRecord {
  id: string;
  workspaceId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}