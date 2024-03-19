import { SVGSkeleton, Skeleton } from "@/components/ui/skeleton";

export const ServiceLoadingSkeleton = () => (
	<>
		<li>
			<div>
				<SVGSkeleton className="w-4 h-4 animate-pulse rounded bg-gray-300" />
				<h4>
					<Skeleton className="w-[320px] max-w-full" />
				</h4>
			</div>
			<h3>
				<Skeleton className="w-[264px] max-w-full" />
			</h3>
			<div>
				<Skeleton className="w-[320px] max-w-full" />
			</div>
		</li>
	</>
);
