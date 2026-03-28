"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PerformanceChartPoint } from "@/types/chart";

interface ChartCardProps {
  data: PerformanceChartPoint[];
}

export function ChartCard({ data }: ChartCardProps) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          Revenue trend across the current reporting window.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] rounded-2xl border border-border bg-background/40 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#98a2b3", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#98a2b3", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#11131a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  color: "#f5f7fa",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}