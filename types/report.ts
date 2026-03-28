export interface ReportRecord {
  id: string;
  clientId: string;
  workspaceId: string;
  name: string;
  periodLabel: string;
  generatedAt: string;
  status: "draft" | "ready";
}