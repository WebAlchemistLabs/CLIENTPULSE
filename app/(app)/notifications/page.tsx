"use client";

import { useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { NotificationItem } from "@/components/notifications/notification-item";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useNotifications } from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const { notifications, setNotifications, unreadCount, loading } =
    useNotifications();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [error, setError] = useState("");

  async function handleMarkAsRead(id: string) {
    setError("");

    try {
      await updateDoc(doc(db, "notifications", id), {
        read: true,
      });

      setNotifications((current) =>
        current.map((item) =>
          item.id === id ? { ...item, read: true } : item
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update notification.");
    }
  }

  const filteredNotifications = useMemo(() => {
    const term = search.trim().toLowerCase();

    return notifications.filter((item) => {
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.message.toLowerCase().includes(term);

      const matchesFilter = filter === "all" || !item.read;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description="Review alerts, client signals, and system updates across your ClientPulse workspace."
      />

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>
            Search and filter important updates. You currently have {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notifications..."
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filter === "unread"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              Unread
            </button>
          </div>
        </CardContent>
      </Card>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>Notification Update Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

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
      ) : filteredNotifications.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Notifications Found</CardTitle>
            <CardDescription>
              No notifications matched your current search or filter.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </section>
      )}
    </div>
  );
}