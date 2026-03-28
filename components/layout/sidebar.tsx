"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActivitySquare } from "lucide-react";
import { adminNavItems, mainNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { isAdmin } from "@/lib/permissions";

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-[#0c0f15] lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <ActivitySquare className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-foreground">
              ClientPulse
            </p>
            <p className="text-xs text-muted-foreground">
              Agency Performance OS
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          <p className="px-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
            Main
          </p>

          <nav className="mt-3 flex flex-col gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {isAdmin(role) ? (
          <div className="mt-8 space-y-2">
            <p className="px-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
              Admin
            </p>

            <nav className="mt-3 flex flex-col gap-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </aside>
  );
}