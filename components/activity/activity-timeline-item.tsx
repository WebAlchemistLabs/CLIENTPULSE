import { ActivityTypeBadge } from "@/components/activity/activity-type-badge";

interface ActivityTimelineItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    type: "report_created" | "client_updated" | "notification_sent" | "health_changed";
    clientName?: string;
  };
  isLast?: boolean;
}

function formatActivityDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ActivityTimelineItem({
  item,
  isLast = false,
}: ActivityTimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      <div className="relative flex flex-col items-center">
        <div className="mt-1 h-3 w-3 rounded-full bg-primary" />
        {!isLast ? (
          <div className="mt-2 h-full w-px flex-1 bg-border" />
        ) : null}
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-card/80 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.clientName ? (
                <span className="rounded-full bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                  {item.clientName}
                </span>
              ) : null}

              <span className="text-xs text-muted-foreground">
                {formatActivityDate(item.createdAt)}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <ActivityTypeBadge type={item.type} />
          </div>
        </div>
      </div>
    </div>
  );
}