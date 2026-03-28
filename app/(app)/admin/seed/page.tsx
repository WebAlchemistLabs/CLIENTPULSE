"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  demoActivity,
  demoClients,
  demoDashboardOverview,
  demoNotifications,
  demoReports,
} from "@/data/demo-data";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSeedData() {
    setLoading(true);
    setMessage("");

    try {
      await setDoc(
        doc(db, "workspaces", demoDashboardOverview.workspaceId, "dashboard", "overview"),
        demoDashboardOverview
      );

      for (const client of demoClients) {
        await setDoc(doc(db, "clients", client.id), client);
      }

      for (const report of demoReports) {
        await setDoc(doc(db, "reports", report.id), report);
      }

      for (const activity of demoActivity) {
        await setDoc(doc(db, "activity", activity.id), activity);
      }

      for (const notification of demoNotifications) {
        await setDoc(doc(db, "notifications", notification.id), notification);
      }

      setMessage("Demo data seeded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to seed demo data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Seed Demo Data"
        description="Populate Firestore with realistic ClientPulse demo data for development and portfolio presentation."
      />

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Development Seeding</CardTitle>
          <CardDescription>
            This will create demo dashboard, client, report, activity, and notification records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleSeedData} disabled={loading}>
            {loading ? "Seeding..." : "Seed Demo Data"}
          </Button>

          {message ? (
            <div className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-muted-foreground">
              {message}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}