import { AlertTriangle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { ClientHealthItem } from "@/types/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientHealthListProps {
  items: ClientHealthItem[];
}

function getStatusIcon(status: ClientHealthItem["status"]) {
  switch (status) {
    case "healthy":
      return ShieldCheck;
    case "attention":
      return AlertTriangle;
    case "critical":
      return AlertTriangle;
    default:
      return ShieldCheck;
  }
}

function getStatusText(status: ClientHealthItem["status"]) {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "attention":
      return "Needs Attention";
    case "critical":
      return "Critical";
    default:
      return "Healthy";
  }
}

function getStatusClasses(status: ClientHealthItem["status"]) {
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

export function ClientHealthList({ items }: ClientHealthListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Health</CardTitle>
        <CardDescription>
          Monitor account health and growth across active clients.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
            No client health data found.
          </div>
        ) : (
          items.map((item) => {
            const StatusIcon = getStatusIcon(item.status);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-background/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-sm font-semibold text-primary">
                      {item.logoText}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Health Score: {item.healthScore}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {getStatusText(item.status)}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Revenue: ${item.revenue.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {item.growthPercent}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}