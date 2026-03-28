import { Bell, FileText, HeartPulse, PencilLine } from "lucide-react";
import { ActivityType } from "@/types/activity";

interface ActivityTypeBadgeProps {
  type: ActivityType;
}

function getTypeLabel(type: ActivityType) {
  switch (type) {
    case "report_created":
      return "Report Created";
    case "client_updated":
      return "Client Updated";
    case "notification_sent":
      return "Notification Sent";
    case "health_changed":
      return "Health Changed";
    default:
      return "Activity";
  }
}

function getTypeClasses(type: ActivityType) {
  switch (type) {
    case "report_created":
      return "bg-primary/15 text-primary";
    case "client_updated":
      return "bg-sky-500/15 text-sky-400";
    case "notification_sent":
      return "bg-amber-500/15 text-amber-400";
    case "health_changed":
      return "bg-emerald-500/15 text-emerald-400";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

function getTypeIcon(type: ActivityType) {
  switch (type) {
    case "report_created":
      return FileText;
    case "client_updated":
      return PencilLine;
    case "notification_sent":
      return Bell;
    case "health_changed":
      return HeartPulse;
    default:
      return FileText;
  }
}

export function ActivityTypeBadge({ type }: ActivityTypeBadgeProps) {
  const Icon = getTypeIcon(type);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getTypeClasses(
        type
      )}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {getTypeLabel(type)}
    </div>
  );
}