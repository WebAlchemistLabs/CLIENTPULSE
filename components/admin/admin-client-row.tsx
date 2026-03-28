import { ArrowUpRight, DollarSign, HeartPulse } from "lucide-react";
import { ClientStatusBadge } from "@/components/clients/client-status-badge";
import { ClientRecord } from "@/types/client";

interface AdminClientRowProps {
  client: ClientRecord;
}

export function AdminClientRow({ client }: AdminClientRowProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-background/40 p-4 md:grid-cols-[1.8fr_1fr_1fr_1fr_auto] md:items-center">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {client.name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{client.industry}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <HeartPulse className="h-4 w-4 text-primary" />
        <span>{client.healthScore}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <DollarSign className="h-4 w-4 text-primary" />
        <span>${client.revenue.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <ArrowUpRight className="h-4 w-4" />
        <span>{client.growthPercent}%</span>
      </div>

      <div>
        <ClientStatusBadge status={client.status} />
      </div>
    </div>
  );
}