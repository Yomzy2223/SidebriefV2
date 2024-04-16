import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CountryCardSK = () => {
  return (
    <div className="flex items-center gap-2 w-full max-w-[200px]">
      <Skeleton className="w-8 h-6 rounded-lg" />
      <Skeleton className="w-48 rounded-lg" />
    </div>
  );
};

export default CountryCardSK;
