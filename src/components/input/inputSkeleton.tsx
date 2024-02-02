import { Skeleton } from "../ui/skeleton";

export const LoadingSkeleton = () => (
	<>
		<div className="flex flex-col gap-2 w-full">
			<div className="leading-normal">
				<Skeleton className="w-full" />
			</div>
			<div className="flex">
				<Skeleton className="w-full" />
			</div>
		</div>
	</>
);
