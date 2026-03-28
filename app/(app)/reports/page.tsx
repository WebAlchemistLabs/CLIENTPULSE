import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Review saved reports, performance summaries, and future export-ready reporting views."
      />

      <Card>
        <CardHeader>
          <CardTitle>Reports Workspace</CardTitle>
          <CardDescription>
            This page will support report filtering, saving, and exports later.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Report tables, filters, and saved views are coming in a later phase.
        </CardContent>
      </Card>
    </div>
  );
}