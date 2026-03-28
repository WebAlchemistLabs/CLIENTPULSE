import { Shield, Users, Building2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const adminStats = [
  {
    title: "Active Users",
    value: "18",
    icon: Users,
  },
  {
    title: "Managed Clients",
    value: "12",
    icon: Building2,
  },
  {
    title: "Admin Controls",
    value: "Enabled",
    icon: Shield,
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin"
        description="Manage users, review system-level controls, and oversee the ClientPulse workspace."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {adminStats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardDescription>{item.title}</CardDescription>
                  <CardTitle className="mt-2 text-2xl">{item.value}</CardTitle>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Admin-level workspace visibility and control surface.
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}