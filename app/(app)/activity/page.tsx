import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ActivityPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Activity"
        description="Track workspace events, reporting updates, and recent client actions."
      />

      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            This page will hold the full event timeline later.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Activity events, filters, and grouped timeline items will be built later.
        </CardContent>
      </Card>
    </div>
  );
}