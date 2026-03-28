import Link from "next/link";
import { ArrowUpRight, BarChart3, Users } from "lucide-react";
import { ClientRecord } from "@/types/client";
import { ClientStatusBadge } from "@/components/clients/client-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientCardProps {
  client: ClientRecord;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Link href={`/clients/${client.id}`} className="block">
      <Card className="h-full border-white/10 bg-card/80 transition hover:border-primary/30 hover:bg-card">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-sm font-semibold text-primary">
              {client.logoText}
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-base">{client.name}</CardTitle>
              <CardDescription className="mt-1">
                {client.industry}
              </CardDescription>
            </div>
          </div>

          <ClientStatusBadge status={client.status} />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-background/50 p-3">
              <p className="text-xs text-muted-foreground">Health Score</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {client.healthScore}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background/50 p-3">
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                ${client.revenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{client.leads} leads</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-muted-foreground">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span>{client.conversions} conversions</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-3">
            <span className="text-sm text-muted-foreground">Growth</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
              {client.growthPercent}%
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}