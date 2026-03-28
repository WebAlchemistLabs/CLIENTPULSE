import { ActivityRecord } from "@/types/activity";
import { ReportRecord } from "@/types/report";

export interface ClientPerformancePoint {
  label: string;
  revenue: number;
  leads: number;
  conversions: number;
}

export interface ClientDetailSeedRecord {
  clientId: string;
  performanceSeries: ClientPerformancePoint[];
}

export interface ClientDetailPageData {
  clientId: string;
  performanceSeries: ClientPerformancePoint[];
  reports: ReportRecord[];
  activity: ActivityRecord[];
}