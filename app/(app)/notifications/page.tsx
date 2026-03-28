import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description="View alerts, system updates, and important client-related notifications."
      />

      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>
            This page will become the main notification inbox.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Read states, unread counts, and actions will be added later.
        </CardContent>
      </Card>
    </div>
  );
}