import { CalendarRange, FileText, FolderKanban } from "lucide-react";
import { ReportStatusBadge } from "@/components/reports/report-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReportCardProps {
  report: {
    id: string;
    name: string;
    periodLabel: string;
    status: "draft" | "ready";
    generatedAt: string;
    clientName: string;
  };
}

function formatGeneratedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <Card className="h-full border-white/10 bg-card/80">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0">
          <CardTitle className="truncate text-base">{report.name}</CardTitle>
          <CardDescription className="mt-1">
            {report.clientName}
          </CardDescription>
        </div>

        <ReportStatusBadge status={report.status} />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
          <FolderKanban className="h-4 w-4 text-primary" />
          <span>{report.clientName}</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
          <CalendarRange className="h-4 w-4 text-primary" />
          <span>{report.periodLabel}</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
          <FileText className="h-4 w-4 text-primary" />
          <span>Generated {formatGeneratedAt(report.generatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}