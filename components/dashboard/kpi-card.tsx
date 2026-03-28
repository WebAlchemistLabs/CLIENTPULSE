import {
  ArrowUpRight,
  DollarSign,
  LineChart,
  TrendingDown,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardMetric } from "@/types/dashboard";

interface KpiCardProps {
  metric: DashboardMetric;
}

function getMetricIcon(icon: DashboardMetric["icon"]) {
  switch (icon) {
    case "revenue":
      return DollarSign;
    case "leads":
      return Users;
    case "conversion":
      return ArrowUpRight;
    case "growth":
      return LineChart;
    default:
      return LineChart;
  }
}

function getBadgeVariant(changeType: DashboardMetric["changeType"]) {
  switch (changeType) {
    case "positive":
      return "success";
    case "negative":
      return "danger";
    default:
      return "secondary";
  }
}

export function KpiCard({ metric }: KpiCardProps) {
  const Icon = getMetricIcon(metric.icon);

  return (
    <Card className="border-white/10 bg-card/80">
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
        <Badge variant={getBadgeVariant(metric.changeType)}>
          {metric.changeType === "negative" ? (
            <TrendingDown className="mr-1 h-3.5 w-3.5" />
          ) : null}
          {metric.change}
        </Badge>
      </CardContent>
    </Card>
  );
}