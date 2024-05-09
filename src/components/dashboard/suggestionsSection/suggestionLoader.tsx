import { Skeleton, SVGSkeleton } from "@/components/ui/skeleton";
import { Card } from "flowbite-react";

export const Loader = () => (
  <Card className="shrink-0 [&_div]:p-4 [&_div]:gap-2 min-w-[200px] max-w-[240px]">
    <Skeleton className="h-5 w-32 mb-1" />
    <Skeleton className="h-3 w-48" />
    <div className="flex items-center gap-2">
      <SVGSkeleton className="h-4 w-4" />
      <Skeleton className="h-3 w-20" />
    </div>
  </Card>
);
