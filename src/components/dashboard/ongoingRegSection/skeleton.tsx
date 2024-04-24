import { Skeleton, SVGSkeleton } from "@/components/ui/skeleton";

export const OngoingRegSkeleton = () => {
  return (
    <div className="flex flex-col gap-9 bg-accent rounded-lg">
      <div className="flex justify-between flex-col gap-6 px-8 pb-5 py-1.5 m-0.5 bg-white rounded-t rounded-lg md:flex-row">
        <div className="md:max-w-[50%]">
          <div className="flex items-center gap-4">
            <h2 className="sb-text-24 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] 2xl:max-w-[800px]">
              <Skeleton className="w-[300px] sm:w-[400px] lg:w-[500px] 2xl:w-[800px]" />
            </h2>
            <Skeleton className="w-16 h-6" />
          </div>
          <p className="text-sm w-4/5">
            <Skeleton className="w-full h-4" />
          </p>
        </div>
        <div className="flex items-center gap-10 md:gap-16">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
      </div>

      <div className="flex overflow-auto gap-2.5 mx-8 mb-8">
        {new Array(4).fill(null).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-1 border border-border px-6 py-5 text-sm text-foreground-3 font-normal rounded bg-white min-w-[250px]"
          >
            <SVGSkeleton className="w-16 h-16 mx-auto" />
            <div>
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
