import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityRecord } from "@/types/activity";

interface ClientActivityListProps {
  activity: ActivityRecord[];
}

export function ClientActivityList({ activity }: ClientActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest important updates for this client account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {activity.length === 0 ? (
          <div className="rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
            No recent client activity found.
          </div>
        ) : (
          activity.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-background/50 p-3"
            >
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}