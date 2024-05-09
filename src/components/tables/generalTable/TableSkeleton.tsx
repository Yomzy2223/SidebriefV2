import { InvertableSkeleton as Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto max-w-full">
      <div className="flex flex-col gap-5 min-w-[1000px] mb-5">
        {/* Table header */}
        <Skeleton className="grid grid-cols-7 grid-flow-row gap-4 items-center w-full h-16 px-10">
          {skeletonHeaders.map((el, i) => (
            <Skeleton key={i} className={`${el} w-full h-4`} invertColor />
          ))}
        </Skeleton>

        {/* Table body */}
        <div className="flex flex-col gap-4 w-full border-t-0 rounded-lg">
          {[1, 2, 3, 4, 5, 6].map((row, i) => (
            <div key={i} className="grid grid-cols-7 grid-flow-row gap-4 items-center px-10 py-2">
              {skeletonRows.map((el, i) => (
                <Skeleton key={i} className={`${el} w-full h-4`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-2 sticky left-0 md:flex-row md:justify-between">
        <Skeleton className="w-full max-w-40 h-6" />
        <div className="flex gap-1 self-center mb-4">
          {[1, 2, 3, 4].map((el, i) => (
            <Skeleton key={i} className="w-8 h-8" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;

const skeletonRows = [
  "max-w-[40px]",
  "max-w-[92px]",
  "max-w-[140px]",
  "max-w-[160px]",
  "max-w-[97px]",
  "max-w-[140px]",
  "max-w-[92px]",
];

const skeletonHeaders = [
  "max-w-[60px]",
  "max-w-[120px]",
  "max-w-[160px]",
  "max-w-[100px]",
  "max-w-[90px]",
  "max-w-[64px]",
  "max-w-[100px]",
];
