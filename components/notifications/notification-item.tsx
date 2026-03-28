import { BellRing, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationRecord } from "@/types/notification";

interface NotificationItemProps {
  notification: NotificationRecord;
  onMarkAsRead: (id: string) => void;
}

function formatNotificationDate(value: string) {
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

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        notification.read
          ? "border-border bg-background/40"
          : "border-primary/20 bg-primary/5"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BellRing className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-foreground">
              {notification.title}
            </p>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {notification.message}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {formatNotificationDate(notification.createdAt)}
            </span>

            {!notification.read ? (
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                Unread
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Read
              </span>
            )}
          </div>
        </div>

        {!notification.read ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark as read
          </Button>
        ) : null}
      </div>
    </div>
  );
}