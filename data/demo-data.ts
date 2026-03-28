import { ActivityRecord } from "@/types/activity";
import { ClientRecord } from "@/types/client";
import { DashboardOverview } from "@/types/dashboard";
import { NotificationRecord } from "@/types/notification";
import { ReportRecord } from "@/types/report";
import { DashboardChartData } from "@/types/chart";

export const DEMO_WORKSPACE_ID = "northstar-media";

export const demoDashboardOverview: DashboardOverview = {
  workspaceId: DEMO_WORKSPACE_ID,
  metrics: [
    {
      title: "Monthly Revenue",
      value: "$48,240",
      change: "+12.4%",
      changeType: "positive",
      icon: "revenue",
    },
    {
      title: "Qualified Leads",
      value: "1,284",
      change: "+8.1%",
      changeType: "positive",
      icon: "leads",
    },
    {
      title: "Conversion Rate",
      value: "6.8%",
      change: "+1.2%",
      changeType: "positive",
      icon: "conversion",
    },
    {
      title: "Growth Index",
      value: "84",
      change: "+5.6%",
      changeType: "positive",
      icon: "growth",
    },
  ],
};

export const demoDashboardCharts: DashboardChartData = {
  workspaceId: DEMO_WORKSPACE_ID,
  performanceSeries: [
    { label: "Mon", revenue: 6200, leads: 140, conversions: 8 },
    { label: "Tue", revenue: 7100, leads: 168, conversions: 10 },
    { label: "Wed", revenue: 6950, leads: 155, conversions: 9 },
    { label: "Thu", revenue: 8240, leads: 182, conversions: 13 },
    { label: "Fri", revenue: 9010, leads: 194, conversions: 14 },
    { label: "Sat", revenue: 7630, leads: 160, conversions: 10 },
    { label: "Sun", revenue: 9110, leads: 201, conversions: 15 },
  ],
  clientHealth: [
    {
      id: "northstar-dental",
      name: "Northstar Dental",
      status: "healthy",
      healthScore: 89,
      revenue: 12800,
      growthPercent: 9.4,
      logoText: "ND",
    },
    {
      id: "luma-fitness",
      name: "Luma Fitness",
      status: "attention",
      healthScore: 67,
      revenue: 9400,
      growthPercent: 2.3,
      logoText: "LF",
    },
    {
      id: "haven-legal",
      name: "Haven Legal Group",
      status: "healthy",
      healthScore: 91,
      revenue: 14350,
      growthPercent: 11.8,
      logoText: "HL",
    },
    {
      id: "alto-homes",
      name: "Alto Homes",
      status: "critical",
      healthScore: 48,
      revenue: 5690,
      growthPercent: -3.2,
      logoText: "AH",
    },
  ],
};

export const demoClients: ClientRecord[] = [
  {
    id: "northstar-dental",
    name: "Northstar Dental",
    industry: "Healthcare",
    status: "healthy",
    healthScore: 89,
    leads: 242,
    conversions: 41,
    revenue: 12800,
    growthPercent: 9.4,
    workspaceId: DEMO_WORKSPACE_ID,
    logoText: "ND",
  },
  {
    id: "luma-fitness",
    name: "Luma Fitness",
    industry: "Fitness",
    status: "attention",
    healthScore: 67,
    leads: 190,
    conversions: 21,
    revenue: 9400,
    growthPercent: 2.3,
    workspaceId: DEMO_WORKSPACE_ID,
    logoText: "LF",
  },
  {
    id: "haven-legal",
    name: "Haven Legal Group",
    industry: "Legal",
    status: "healthy",
    healthScore: 91,
    leads: 156,
    conversions: 33,
    revenue: 14350,
    growthPercent: 11.8,
    workspaceId: DEMO_WORKSPACE_ID,
    logoText: "HL",
  },
  {
    id: "alto-homes",
    name: "Alto Homes",
    industry: "Real Estate",
    status: "critical",
    healthScore: 48,
    leads: 112,
    conversions: 12,
    revenue: 5690,
    growthPercent: -3.2,
    workspaceId: DEMO_WORKSPACE_ID,
    logoText: "AH",
  },
];

export const demoReports: ReportRecord[] = [
  {
    id: "report-weekly-northstar",
    clientId: "northstar-dental",
    workspaceId: DEMO_WORKSPACE_ID,
    name: "Weekly Growth Summary",
    periodLabel: "Last 7 Days",
    generatedAt: "2026-03-26T10:00:00.000Z",
    status: "ready",
  },
  {
    id: "report-monthly-luma",
    clientId: "luma-fitness",
    workspaceId: DEMO_WORKSPACE_ID,
    name: "Monthly Campaign Performance",
    periodLabel: "March 2026",
    generatedAt: "2026-03-25T14:30:00.000Z",
    status: "ready",
  },
  {
    id: "report-quarterly-haven",
    clientId: "haven-legal",
    workspaceId: DEMO_WORKSPACE_ID,
    name: "Quarterly Revenue Snapshot",
    periodLabel: "Q1 2026",
    generatedAt: "2026-03-24T09:15:00.000Z",
    status: "draft",
  },
];

export const demoActivity: ActivityRecord[] = [
  {
    id: "activity-1",
    workspaceId: DEMO_WORKSPACE_ID,
    clientId: "northstar-dental",
    title: "Northstar Dental weekly report updated",
    description: "Performance summary now includes latest lead attribution data.",
    type: "report_created",
    createdAt: "2026-03-26T12:30:00.000Z",
  },
  {
    id: "activity-2",
    workspaceId: DEMO_WORKSPACE_ID,
    clientId: "luma-fitness",
    title: "Luma Fitness health score changed",
    description: "Health score dropped after lower campaign conversion volume.",
    type: "health_changed",
    createdAt: "2026-03-26T09:40:00.000Z",
  },
  {
    id: "activity-3",
    workspaceId: DEMO_WORKSPACE_ID,
    clientId: "haven-legal",
    title: "Haven Legal conversion rate increased",
    description: "Client trend improved after landing page optimization.",
    type: "client_updated",
    createdAt: "2026-03-25T15:10:00.000Z",
  },
  {
    id: "activity-4",
    workspaceId: DEMO_WORKSPACE_ID,
    title: "Quarterly workspace summary generated",
    description: "A fresh summary report is now available for account managers.",
    type: "notification_sent",
    createdAt: "2026-03-25T08:10:00.000Z",
  },
];

export const demoNotifications: NotificationRecord[] = [
  {
    id: "notification-1",
    workspaceId: DEMO_WORKSPACE_ID,
    title: "New weekly summary available",
    message: "Northstar Dental weekly performance summary is ready to review.",
    read: false,
    createdAt: "2026-03-26T12:45:00.000Z",
  },
  {
    id: "notification-2",
    workspaceId: DEMO_WORKSPACE_ID,
    title: "Health score alert",
    message: "Luma Fitness dropped below the target health threshold.",
    read: false,
    createdAt: "2026-03-26T09:45:00.000Z",
  },
  {
    id: "notification-3",
    workspaceId: DEMO_WORKSPACE_ID,
    title: "Quarterly report draft created",
    message: "Haven Legal Group quarterly report was saved as a draft.",
    read: true,
    createdAt: "2026-03-24T09:20:00.000Z",
  },
];