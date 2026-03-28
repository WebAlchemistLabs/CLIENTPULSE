import { AlertTriangle, ShieldCheck, Siren } from "lucide-react";
import { ClientStatus } from "@/types/client";

interface ClientStatusBadgeProps {
  status: ClientStatus;
}

function getStatusLabel(status: ClientStatus) {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "attention":
      return "Attention";
    case "critical":
      return "Critical";
    default:
      return "Healthy";
  }
}

function getStatusClasses(status: ClientStatus) {
  switch (status) {
    case "healthy":
      return "bg-emerald-500/15 text-emerald-400";
    case "attention":
      return "bg-amber-500/15 text-amber-400";
    case "critical":
      return "bg-red-500/15 text-red-400";
    default:
      return "bg-emerald-500/15 text-emerald-400";
  }
}

function getStatusIcon(status: ClientStatus) {
  switch (status) {
    case "healthy":
      return ShieldCheck;
    case "attention":
      return AlertTriangle;
    case "critical":
      return Siren;
    default:
      return ShieldCheck;
  }
}

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  const Icon = getStatusIcon(status);

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
        status
      )}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {getStatusLabel(status)}
    </div>
  );
}