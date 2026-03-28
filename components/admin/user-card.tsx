import { Mail, User2 } from "lucide-react";
import { RoleBadge } from "@/components/admin/role-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppUser } from "@/types/auth";

interface UserCardProps {
  user: AppUser;
}

export function UserCard({ user }: UserCardProps) {
  const initials =
    user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CP";

  return (
    <Card className="border-white/10 bg-card/80">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-sm font-semibold text-primary">
            {initials}
          </div>

          <div className="min-w-0">
            <CardTitle className="truncate text-base">{user.name}</CardTitle>
            <CardDescription className="mt-1">
              {user.workspaceId}
            </CardDescription>
          </div>
        </div>

        <RoleBadge role={user.role} />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-sm text-muted-foreground">
          <User2 className="h-4 w-4 text-primary" />
          <span>User ID: {user.id}</span>
        </div>
      </CardContent>
    </Card>
  );
}