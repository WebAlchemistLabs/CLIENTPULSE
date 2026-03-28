import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PageSkeletonProps {
  cards?: number;
  layout?: "grid" | "list";
}

export function PageSkeleton({
  cards = 4,
  layout = "grid",
}: PageSkeletonProps) {
  if (layout === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: cards }).map((_, index) => (
          <Card key={index} className="border-white/10 bg-card/80">
            <CardHeader>
              <div className="h-5 w-40 rounded bg-white/5" />
              <div className="mt-2 h-4 w-64 rounded bg-white/5" />
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: cards }).map((_, index) => (
        <Card key={index} className="border-white/10 bg-card/80">
          <CardHeader>
            <div className="h-5 w-32 rounded bg-white/5" />
            <div className="mt-2 h-4 w-24 rounded bg-white/5" />
          </CardHeader>
          <CardContent>
            <div className="h-28 rounded bg-white/5" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}