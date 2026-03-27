import { ArrowRight, BarChart3, Bell, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-6">
            Premium multi-client reporting platform
          </Badge>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            ClientPulse helps agencies track client performance through one
            premium SaaS workspace.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Monitor client health, reporting metrics, growth trends, leads,
            revenue, and team activity from one modern analytics platform built
            for agencies, consultants, freelancers, and service businesses.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg">
              Enter App
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="lg">
              View Product Preview
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Performance Dashboards</CardTitle>
              <CardDescription>
                Review KPIs, campaign metrics, revenue trends, and health scores
                across all active clients.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>

          <Card>
            <CardHeader>
              <Bell className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Activity + Notifications</CardTitle>
              <CardDescription>
                Stay informed with recent updates, important alerts, and client
                changes in one place.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>

          <Card>
            <CardHeader>
              <ShieldCheck className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>
                Separate admin, manager, and viewer experiences with protected
                routes and scalable product architecture.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        </div>
      </section>
    </main>
  );
}