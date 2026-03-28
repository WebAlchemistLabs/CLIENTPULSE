"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";
import { ArrowUpRight, BarChart3, DollarSign, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ClientStatusBadge } from "@/components/clients/client-status-badge";
import { ClientPerformanceChart } from "@/components/clients/client-performance-chart";
import { ClientReportsList } from "@/components/clients/client-reports-list";
import { ClientActivityList } from "@/components/clients/client-activity-list";
import { ErrorState } from "@/components/shared/error-state";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { ClientRecord } from "@/types/client";
import { ClientDetailSeedRecord } from "@/types/client-detail";
import { ReportRecord } from "@/types/report";
import { ActivityRecord } from "@/types/activity";

interface ClientDetailPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState<ClientRecord | null>(null);
  const [detailData, setDetailData] = useState<ClientDetailSeedRecord | null>(null);
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [activity, setActivity] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function unwrapParams() {
      const resolved = await params;
      setClientId(resolved.clientId);
    }

    unwrapParams();
  }, [params]);

  useEffect(() => {
    async function loadClientDetail() {
      if (!clientId) return;

      setLoading(true);
      setError("");

      try {
        const clientRef = doc(db, "clients", clientId);
        const detailRef = doc(db, "clientDetails", clientId);

        const [clientSnapshot, detailSnapshot] = await Promise.all([
          getDoc(clientRef),
          getDoc(detailRef),
        ]);

        if (!clientSnapshot.exists()) {
          setError("Client not found.");
          setClient(null);
          setDetailData(null);
          setReports([]);
          setActivity([]);
          return;
        }

        setClient(clientSnapshot.data() as ClientRecord);
        setDetailData(
          detailSnapshot.exists()
            ? (detailSnapshot.data() as ClientDetailSeedRecord)
            : null
        );

        const reportsQuery = query(
          collection(db, "reports"),
          where("clientId", "==", clientId)
        );

        const activityQuery = query(
          collection(db, "activity"),
          where("clientId", "==", clientId),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const [reportsSnapshot, activitySnapshot] = await Promise.all([
          getDocs(reportsQuery),
          getDocs(activityQuery),
        ]);

        setReports(reportsSnapshot.docs.map((docItem) => docItem.data() as ReportRecord));
        setActivity(activitySnapshot.docs.map((docItem) => docItem.data() as ActivityRecord));
      } catch (err) {
        console.error(err);
        setError("Failed to load client details.");
      } finally {
        setLoading(false);
      }
    }

    loadClientDetail();
  }, [clientId]);

  if (loading) {
    return <PageSkeleton cards={4} layout="grid" />;
  }

  if (error || !client) {
    return (
      <ErrorState
        title="Client Detail Unavailable"
        description={error || "Client not found."}
      />
    );
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
        <ClientPerformanceChart data={detailData?.performanceSeries ?? []} />
        <ClientReportsList reports={reports} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Client Overview</CardTitle>
            <CardDescription>
              Structured account snapshot for this client workspace.
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

        <ClientActivityList activity={activity} />
      </section>
    </div>
  );
}