import { cn } from "@/lib/utils";

function Skeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-white/5", className)}
    />
  );
}

export { Skeleton };