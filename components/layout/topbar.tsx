"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Topbar() {
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
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <div className="hidden items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              MH
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">Marlon Haynes</p>
              <div className="mt-1">
                <Badge variant="secondary">Admin</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}