"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ReportCard } from "@/components/reports/report-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { ClientRecord } from "@/types/client";
import { ReportRecord } from "@/types/report";

interface ReportWithClientName extends ReportRecord {
  clientName: string;
}

export default function ReportsPage() {
  const { appUser } = useAuth();
  const [reports, setReports] = useState<ReportWithClientName[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "ready">(
    "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      if (!appUser?.workspaceId) return;

      setLoading(true);
      setError("");

      try {
        const [reportsSnapshot, clientsSnapshot] = await Promise.all([
          getDocs(
            query(
              collection(db, "reports"),
              where("workspaceId", "==", appUser.workspaceId)
            )
          ),
          getDocs(
            query(
              collection(db, "clients"),
              where("workspaceId", "==", appUser.workspaceId)
            )
          ),
        ]);

        const clientsMap = new Map<string, string>();

        clientsSnapshot.docs.forEach((docItem) => {
          const client = docItem.data() as ClientRecord;
          clientsMap.set(client.id, client.name);
        });

        const results = reportsSnapshot.docs.map((docItem) => {
          const report = docItem.data() as ReportRecord;

          return {
            ...report,
            clientName: clientsMap.get(report.clientId) ?? "Unknown Client",
          };
        });

        setReports(results);
      } catch (err) {
        console.error(err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, [appUser?.workspaceId]);

  const filteredReports = useMemo(() => {
    const term = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !term ||
        report.name.toLowerCase().includes(term) ||
        report.clientName.toLowerCase().includes(term) ||
        report.periodLabel.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Review saved reports, reporting outputs, and client performance summaries across your workspace."
      />

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle>Reports Workspace</CardTitle>
          <CardDescription>
            Search and filter report outputs across your client accounts.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reports, clients, or periods..."
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("ready")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "ready"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              Ready
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("draft")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "draft"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              Draft
            </button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <PageSkeleton cards={3} layout="grid" />
      ) : error ? (
        <ErrorState
          title="Reports Unavailable"
          description={error}
        />
      ) : filteredReports.length === 0 ? (
        <EmptyState
          title="No Reports Found"
          description="No reports matched your current search or filter."
        />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </section>
      )}
    </div>
  );
}