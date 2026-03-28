import { UserRole } from "@/types/auth";

export function isAdmin(role?: UserRole | null) {
  return role === "admin";
}

export function canManageClients(role?: UserRole | null) {
  return role === "admin" || role === "account_manager";
}

export function canViewReports(role?: UserRole | null) {
  return role === "admin" || role === "account_manager" || role === "viewer";
}