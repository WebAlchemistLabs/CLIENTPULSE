"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import {
  ArrowUpRight,
  DollarSign,
  LineChart,
  TrendingDown,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { DashboardMetric, DashboardOverview } from "@/types/dashboard";
import { ActivityRecord } from "@/types/activity";

function getMetricIcon(icon: DashboardMetric["icon"]) {
  switch (icon) {
    case "revenue":
      return DollarSign;
    case "leads":
      return Users;
    case "conversion":
      return ArrowUpRight;
    case "growth":
      return LineChart;
    default:
      return LineChart;
  }
}

function getBadgeVariant(changeType: DashboardMetric["changeType"]) {
  switch (changeType) {
    case "positive":
      return "success";
    case "negative":
      return "danger";
    default:
      return "secondary";
  }
}

export default function DashboardPage() {
  const { appUser } = useAuth();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      if (!appUser?.workspaceId) return;

      setLoading(true);
      setError("");

      try {
        const dashboardRef = doc(
          db,
          "workspaces",
          appUser.workspaceId,
          "dashboard",
          "overview"
        );

        const dashboardSnapshot = await getDoc(dashboardRef);

        if (!dashboardSnapshot.exists()) {
          setError(
            "No dashboard data found yet. Seed demo data from the admin area first."
          );
          setOverview(null);
          setRecentActivity([]);
          return;
        }

        setOverview(dashboardSnapshot.data() as DashboardOverview);

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="h-4 w-24 rounded bg-white/5" />
                <div className="mt-3 h-8 w-32 rounded bg-white/5" />
              </CardHeader>
              <CardContent>
                <div className="h-6 w-20 rounded bg-white/5" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Unavailable</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {overview?.metrics.map((metric) => {
              const Icon = getMetricIcon(metric.icon);

              return (
                <Card key={metric.title} className="border-white/10 bg-card/80">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                    <div>
                      <CardDescription>{metric.title}</CardDescription>
                      <CardTitle className="mt-2 text-2xl">
                        {metric.value}
                      </CardTitle>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Badge variant={getBadgeVariant(metric.changeType)}>
                      {metric.changeType === "negative" ? (
                        <TrendingDown className="mr-1 h-3.5 w-3.5" />
                      ) : null}
                      {metric.change}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>
                  This section will later hold the main performance chart and date
                  range filtering controls.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[320px] items-center justify-center rounded-2xl border border-dashed border-border bg-background/40 text-sm text-muted-foreground">
                  Chart area placeholder
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Important updates across clients and reporting workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.length === 0 ? (
                  <div className="rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
                    No recent activity found.
                  </div>
                ) : (
                  recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-background/50 p-3"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}