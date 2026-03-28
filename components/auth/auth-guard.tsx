"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { isAdmin } from "@/lib/permissions";

interface AuthGuardProps {
  children: ReactNode;
}

const publicRoutes = ["/login", "/signup"];
const adminRoutes = ["/admin"];

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.some((route) =>
      pathname === route || pathname.startsWith(`${route}/`)
    );

    if (!user && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    if (user && isPublicRoute) {
      router.replace("/dashboard");
      return;
    }

    if (user && isAdminRoute && !isAdmin(role)) {
      router.replace("/dashboard");
    }
  }, [user, role, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="rounded-2xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground shadow-sm">
          Loading ClientPulse...
        </div>
      </div>
    );
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!user && !isPublicRoute) return null;
  if (user && isPublicRoute) return null;
  if (user && isAdminRoute && !isAdmin(role)) return null;

  return <>{children}</>;
}