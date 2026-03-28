import { UserRole } from "@/types/auth";

interface RoleBadgeProps {
  role: UserRole;
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "admin":
      return "Admin";
    case "account_manager":
      return "Account Manager";
    case "viewer":
      return "Viewer";
    default:
      return "Viewer";
  }
}

function getRoleClasses(role: UserRole) {
  switch (role) {
    case "admin":
      return "bg-primary/15 text-primary";
    case "account_manager":
      return "bg-sky-500/15 text-sky-400";
    case "viewer":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getRoleClasses(
        role
      )}`}
    >
      {getRoleLabel(role)}
    </div>
  );
}