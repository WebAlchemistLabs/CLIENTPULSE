"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientHealthList } from "@/components/dashboard/client-health-list";
import { ChartCard } from "@/components/dashboard/chart-card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ErrorState } from "@/components/shared/error-state";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { DashboardOverview } from "@/types/dashboard";
import { ActivityRecord } from "@/types/activity";
import { DashboardChartData } from "@/types/chart";

export default function DashboardPage() {
  const { appUser } = useAuth();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [chartData, setChartData] = useState<DashboardChartData | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityRecord[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!appUser?.workspaceId) {
      setOverview(null);
      setChartData(null);
      setRecentActivity([]);
      setLoadingOverview(false);
      setLoadingCharts(false);
      setLoadingActivity(false);
      return;
    }

    setError("");

    const overviewRef = doc(
      db,
      "workspaces",
      appUser.workspaceId,
      "dashboard",
      "overview"
    );

    const chartsRef = doc(
      db,
      "workspaces",
      appUser.workspaceId,
      "dashboard",
      "charts"
    );

    const activityQuery = query(
      collection(db, "activity"),
      where("workspaceId", "==", appUser.workspaceId),
      orderBy("createdAt", "desc"),
      limit(4)
    );

    const unsubscribeOverview = onSnapshot(
      overviewRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setOverview(null);
          setError("No dashboard data found yet. Seed demo data from the admin area first.");
        } else {
          setOverview(snapshot.data() as DashboardOverview);
        }
        setLoadingOverview(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load dashboard overview.");
        setLoadingOverview(false);
      }
    );

    const unsubscribeCharts = onSnapshot(
      chartsRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setChartData(null);
          setError("No chart data found yet. Seed demo data from the admin area first.");
        } else {
          setChartData(snapshot.data() as DashboardChartData);
        }
        setLoadingCharts(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load dashboard charts.");
        setLoadingCharts(false);
      }
    );

    const unsubscribeActivity = onSnapshot(
      activityQuery,
      async (snapshot) => {
        const activityData = snapshot.docs.map((docItem) => {
          return docItem.data() as ActivityRecord;
        });

        setRecentActivity(activityData);
        setLoadingActivity(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load dashboard activity.");
        setLoadingActivity(false);
      }
    );

    return () => {
      unsubscribeOverview();
      unsubscribeCharts();
      unsubscribeActivity();
    };
  }, [appUser?.workspaceId]);

  const loading = loadingOverview || loadingCharts || loadingActivity;
  const hasCriticalMissingData = !loading && (!overview || !chartData);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Track portfolio-wide client performance, monitor health signals, and review the latest growth metrics across your workspace."
        action={<Button>Generate Report</Button>}
      />

      {loading ? (
        <PageSkeleton cards={4} layout="grid" />
      ) : error && hasCriticalMissingData ? (
        <ErrorState
          title="Dashboard Unavailable"
          description={error}
        />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {overview?.metrics.map((metric) => (
              <KpiCard key={metric.title} metric={metric} />
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <ChartCard data={chartData?.performanceSeries ?? []} />
            <ClientHealthList items={chartData?.clientHealth ?? []} />
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Important updates across clients and reporting workflows.
                </CardDescription>
              </CardHeader>
              <div className="grid gap-3 px-6 pb-6 md:grid-cols-2 xl:grid-cols-4">
                {recentActivity.length === 0 ? (
                  <div className="rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
                    No recent activity found.
                  </div>
                ) : (
                  recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-background/50 p-4"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}