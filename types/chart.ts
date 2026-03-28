export interface PerformanceChartPoint {
  label: string;
  revenue: number;
  leads: number;
  conversions: number;
}

export interface ClientHealthItem {
  id: string;
  name: string;
  status: "healthy" | "attention" | "critical";
  healthScore: number;
  revenue: number;
  growthPercent: number;
  logoText: string;
}

export interface DashboardChartData {
  workspaceId: string;
  performanceSeries: PerformanceChartPoint[];
  clientHealth: ClientHealthItem[];
}