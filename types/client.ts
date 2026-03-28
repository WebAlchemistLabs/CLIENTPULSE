export type ClientStatus = "healthy" | "attention" | "critical";

export interface ClientRecord {
  id: string;
  name: string;
  industry: string;
  status: ClientStatus;
  healthScore: number;
  leads: number;
  conversions: number;
  revenue: number;
  growthPercent: number;
  workspaceId: string;
  logoText: string;
}