import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { ArrowUpRight, BarChart3, DollarSign, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ClientStatusBadge } from "@/components/clients/client-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { ClientRecord } from "@/types/client";

interface ClientDetailPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

async function getClient(clientId: string) {
  const snapshot = await getDoc(doc(db, "clients", clientId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as ClientRecord;
}

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { clientId } = await params;
  const client = await getClient(clientId);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={client.name}
        description={`Performance and account health overview for the ${client.industry.toLowerCase()} client account.`}
        action={<ClientStatusBadge status={client.status} />}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription>Health Score</CardDescription>
              <CardTitle className="mt-2 text-2xl">{client.healthScore}</CardTitle>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="mt-2 text-2xl">
                ${client.revenue.toLocaleString()}
              </CardTitle>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription>Leads</CardDescription>
              <CardTitle className="mt-2 text-2xl">{client.leads}</CardTitle>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription>Growth</CardDescription>
              <CardTitle className="mt-2 text-2xl">
                {client.growthPercent}%
              </CardTitle>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Client Overview</CardTitle>
            <CardDescription>
              This client detail experience will expand into charts, reports, notes, and timeline modules in future phases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-border bg-background/50 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Client Name</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {client.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {client.industry}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Workspace</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {client.workspaceId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {client.conversions}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Snapshot</CardTitle>
            <CardDescription>
              Quick summary of current account health.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border bg-background/50 p-3">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-2">
                <ClientStatusBadge status={client.status} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background/50 p-3">
              <p className="text-sm text-muted-foreground">Logo Token</p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {client.logoText}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}