import { cn } from "@/lib/utils";

export const Skeleton = ({ className }: { className: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <div className="inline-flex w-full h-full animate-pulse select-none bg-gray-300">&nbsp;</div>
    <br />
  </div>
);

export const SVGSkeleton = ({ className }: { className: string }) => (
  <svg className={className + " animate-pulse rounded bg-gray-300"} />
);

interface propsType extends React.HTMLAttributes<HTMLDivElement> {
  invertColor?: boolean;
}

export const InvertableSkeleton = ({ className, invertColor, ...props }: propsType) => {
  const bgColor = invertColor ? "bg-[#ffffffcc]" : "bg-gray-200";

  return <div className={cn("animate-pulse rounded-md", bgColor, className)} {...props} />;
};
