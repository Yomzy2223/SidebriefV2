import { Skeleton, SVGSkeleton } from "@/components/ui/skeleton";

export const FileSkeletonLoader = () => (
  <div className="sb-text-16 flex items-center leading-normal rounded-[50px] py-4 px-6 bg-[#FAFAFA]">
    <div className="mr-2 w-6 h-6">
      <SVGSkeleton className="w-full h-full" />
    </div>
    <Skeleton className="w-32 h-4" />
  </div>
);
