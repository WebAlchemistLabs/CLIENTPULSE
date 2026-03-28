"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      if (!appUser?.workspaceId) return;

      setLoading(true);
      setError("");

      try {
        const dashboardOverviewRef = doc(
          db,
          "workspaces",
          appUser.workspaceId,
          "dashboard",
          "overview"
        );

        const dashboardChartsRef = doc(
          db,
          "workspaces",
          appUser.workspaceId,
          "dashboard",
          "charts"
        );

        const [overviewSnapshot, chartsSnapshot] = await Promise.all([
          getDoc(dashboardOverviewRef),
          getDoc(dashboardChartsRef),
        ]);

        if (!overviewSnapshot.exists() || !chartsSnapshot.exists()) {
          setError(
            "No dashboard data found yet. Seed demo data from the admin area first."
          );
          setOverview(null);
          setChartData(null);
          setRecentActivity([]);
          return;
        }

        setOverview(overviewSnapshot.data() as DashboardOverview);
        setChartData(chartsSnapshot.data() as DashboardChartData);

        const activityQuery = query(
          collection(db, "activity"),
          where("workspaceId", "==", appUser.workspaceId),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const activitySnapshot = await getDocs(activityQuery);
        const activityData = activitySnapshot.docs.map((docItem) => {
          return docItem.data() as ActivityRecord;
        });

        setRecentActivity(activityData);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [appUser?.workspaceId]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Track portfolio-wide client performance, monitor health signals, and review the latest growth metrics across your workspace."
        action={<Button>Generate Report</Button>}
      />

      {loading ? (
        <PageSkeleton cards={4} layout="grid" />
      ) : error ? (
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