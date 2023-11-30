import { cn } from "@/lib/utils";
import { launchSteps } from "./constant";

export const LaunchStepper = ({ progress = 1 }: { progress?: number }) => {
	return (
		<ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
			{launchSteps.map((el, i) => (
				<li className="mb-10 ms-6" key={i}>
					<span
						className={cn(
							"absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700",
							{
								"bg-yellow-100 dark:bg-yellow-900":
									progress >= i + 1,
							}
						)}
					>
						<div
							className={cn("text-primary dark:text-primary", {
								"text-gray-500": !(progress >= i + 1),
							})}
						>
							<el.Icon className="w-4 h-4" />
						</div>
					</span>
					<h3 className="font-medium leading-tight">{el.name}</h3>
					<p className="text-sm">{el.description}</p>
				</li>
			))}
		</ol>
	);
};
