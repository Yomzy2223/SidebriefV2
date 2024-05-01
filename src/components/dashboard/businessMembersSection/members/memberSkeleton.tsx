import { Skeleton, SVGSkeleton } from "@/components/ui/skeleton";

export const MemberCardSkeleton = () => {
  return (
    <div className="flex justify-between gap-6">
      <div className="flex gap-2 items-center">
        <SVGSkeleton className="h-[40px] w-[40px] rounded-full" />
        <div>
          <div className="flex gap-1">
            <Skeleton className="sb-text-16 leading-normal text-foreground-9 font-mediumn whitespace-nowrap overflow-hidden text-ellipsis w-24 h-4" />
            <Skeleton className="flex items-center gap-1 text-xs text-destructive-foreground bg-destructive rounded-md px-2.5 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis w-24 h-4" />
          </div>
          <Skeleton className="leading-normal text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis w-48 h-4" />
        </div>
      </div>
      <Skeleton className="px-2.5 py-0.5 rounded-md" />
    </div>
  );
};
