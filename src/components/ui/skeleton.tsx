export const Skeleton = ({ className }: { className: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <div className="inline-flex w-full h-full animate-pulse select-none bg-gray-300">&nbsp;</div>
    <br />
  </div>
);

export const SVGSkeleton = ({ className }: { className: string }) => (
  <svg className={className + " animate-pulse rounded bg-gray-300"} />
);
