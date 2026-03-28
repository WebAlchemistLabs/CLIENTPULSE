export type UserRole = "admin" | "account_manager" | "viewer";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  workspaceId: string;
  avatarUrl?: string;
}