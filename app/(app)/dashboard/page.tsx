import { ArrowUpRight, DollarSign, LineChart, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metrics = [
  {
    title: "Monthly Revenue",
    value: "$48,240",
    change: "+12.4%",
    icon: DollarSign,
  },
  {
    title: "Qualified Leads",
    value: "1,284",
    change: "+8.1%",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "6.8%",
    change: "+1.2%",
    icon: ArrowUpRight,
  },
  {
    title: "Growth Index",
    value: "84",
    change: "+5.6%",
    icon: LineChart,
  },
];

const recentActivity = [
  "Northstar Media weekly report was updated.",
  "Luma Dental crossed a 7.1% conversion rate.",
  "Account Manager added a new campaign note.",
  "Quarterly revenue summary was generated.",
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Track portfolio-wide client performance, monitor health signals, and review the latest growth metrics across your workspace."
        action={
          <Button>
            Generate Report
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.title} className="border-white/10 bg-card/80">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div>
                  <CardDescription>{metric.title}</CardDescription>
                  <CardTitle className="mt-2 text-2xl">{metric.value}</CardTitle>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>

              <CardContent>
                <Badge variant="success">{metric.change}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              This section will later hold the main performance chart and date
              range filtering controls.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[320px] items-center justify-center rounded-2xl border border-dashed border-border bg-background/40 text-sm text-muted-foreground">
              Chart area placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Important updates across clients and reporting workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}