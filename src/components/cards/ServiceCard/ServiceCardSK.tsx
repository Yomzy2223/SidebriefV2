import { Skeleton, SVGSkeleton } from "@/components/ui/skeleton";
import React from "react";

const ServiceCardSK = () => {
  return (
    <div className="flex flex-col gap-3 h-36 w-full max-w-[220px] border border-border rounded p-4">
      <Skeleton className=" w-6 h-6 rounded-full overflow-hidden" />
      <Skeleton className="h-3 w-4/6" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-4/5" />
        <Skeleton className="h-2 w-4/6" />
        <Skeleton className="h-2 w-4/5" />
      </div>
    </div>
  );
};

export default ServiceCardSK;
