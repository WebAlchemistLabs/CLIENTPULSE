"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ActivityTimelineItem } from "@/components/activity/activity-timeline-item";
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
import { ActivityRecord } from "@/types/activity";
import { ClientRecord } from "@/types/client";

interface ActivityWithClientName extends ActivityRecord {
  clientName?: string;
}

export default function ActivityPage() {
  const { appUser } = useAuth();
  const [activity, setActivity] = useState<ActivityWithClientName[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadActivity() {
      if (!appUser?.workspaceId) return;

      setLoading(true);
      setError("");

      try {
        const [activitySnapshot, clientsSnapshot] = await Promise.all([
          getDocs(
            query(
              collection(db, "activity"),
              where("workspaceId", "==", appUser.workspaceId),
              orderBy("createdAt", "desc")
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

        const results = activitySnapshot.docs.map((docItem) => {
          const item = docItem.data() as ActivityRecord;

          return {
            ...item,
            clientName: item.clientId
              ? clientsMap.get(item.clientId) ?? "Unknown Client"
              : undefined,
          };
        });

        setActivity(results);
      } catch (err) {
        console.error(err);
        setError("Failed to load activity.");
      } finally {
        setLoading(false);
      }
    }

    loadActivity();
  }, [appUser?.workspaceId]);

  const filteredActivity = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return activity;

    return activity.filter((item) => {
      return (
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        (item.clientName?.toLowerCase().includes(term) ?? false)
      );
    });
  }, [activity, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Activity"
        description="Track workspace events, reporting updates, and recent client actions across your ClientPulse workspace."
      />

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle>Workspace Timeline</CardTitle>
          <CardDescription>
            Search and review recent reporting, client, and notification events.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activity, clients, or event types..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="h-5 w-40 rounded bg-white/5" />
                <div className="mt-2 h-4 w-64 rounded bg-white/5" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardHeader>
            <CardTitle>Activity Unavailable</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : filteredActivity.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Activity Found</CardTitle>
            <CardDescription>
              No activity matched your current search.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="space-y-4">
          {filteredActivity.map((item, index) => (
            <ActivityTimelineItem
              key={item.id}
              item={item}
              isLast={index === filteredActivity.length - 1}
            />
          ))}
        </section>
      )}
    </div>
  );
}