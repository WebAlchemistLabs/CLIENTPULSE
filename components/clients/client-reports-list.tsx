import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportRecord } from "@/types/report";

interface ClientReportsListProps {
  reports: ReportRecord[];
}

export function ClientReportsList({ reports }: ClientReportsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Reports</CardTitle>
        <CardDescription>
          Recent reporting outputs connected to this client account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.length === 0 ? (
          <div className="rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
            No reports found for this client.
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="rounded-xl border border-border bg-background/50 p-3"
            >
              <p className="text-sm font-medium text-foreground">
                {report.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {report.periodLabel}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Status: {report.status}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}