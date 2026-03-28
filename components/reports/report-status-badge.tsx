interface ReportStatusBadgeProps {
  status: "draft" | "ready";
}

function getStatusClasses(status: "draft" | "ready") {
  switch (status) {
    case "ready":
      return "bg-emerald-500/15 text-emerald-400";
    case "draft":
      return "bg-amber-500/15 text-amber-400";
    default:
      return "bg-amber-500/15 text-amber-400";
  }
}

function getStatusLabel(status: "draft" | "ready") {
  switch (status) {
    case "ready":
      return "Ready";
    case "draft":
      return "Draft";
    default:
      return "Draft";
  }
}

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </div>
  );
}