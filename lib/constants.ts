import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Shield,
} from "lucide-react";

export const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Activity",
    href: "/activity",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const adminNavItems = [
  {
    title: "Admin",
    href: "/admin",
    icon: Shield,
  },
  {
    title: "Seed Demo Data",
    href: "/admin/seed",
    icon: Shield,
  },
];