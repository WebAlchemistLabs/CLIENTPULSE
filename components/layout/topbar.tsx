"use client";

import Link from "next/link";
import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";

export function Topbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const initials =
    user?.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CP";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden min-w-[220px] items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 md:flex">
            <span className="text-sm font-medium text-foreground">
              Northstar Media
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="hidden w-full max-w-md lg:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clients, reports, activity..."
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/notifications">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 ? (
                <>
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                </>
              ) : null}
            </Button>
          </Link>

          <div className="hidden items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              {initials}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                {user?.displayName || "ClientPulse User"}
              </p>
              <div className="mt-1">
                <Badge variant="secondary">Authenticated</Badge>
              </div>
            </div>
          </div>

          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}