import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Clients"
        description="Manage active client accounts, review health status, and prepare deeper reporting views."
      />

      <Card>
        <CardHeader>
          <CardTitle>Clients Directory</CardTitle>
          <CardDescription>
            This page will become the central client management experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Client list, health indicators, filters, and search will be added in the next phases.
        </CardContent>
      </Card>
    </div>
  );
}