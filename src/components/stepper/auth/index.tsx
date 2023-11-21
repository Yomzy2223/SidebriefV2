import { cn } from "@/lib/utiils";
import { Thumbs, Profilecard, FileShield } from "@/assets/icons";

export const AuthStepper = ({ progress = 1 }: { progress?: number }) => {
	return (
		<ol className="flex items-center w-full mb-4 sm:mb-5 gap-2">
			<li
				className={cn(
					"flex w-full items-center gap-2 after:content-[''] after:w-full after:h-1.5 after:bg-gray-100 after:inline-block",
					{ "after:bg-blue-100": progress >= 2 }
				)}
			>
				<div
					className={cn(
						"flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0",
						{ "bg-blue-100 text-primary": progress >= 1 }
					)}
				>
					<Thumbs />
				</div>
			</li>
			<li
				className={cn(
					"flex w-full items-center gap-2 after:content-[''] after:w-full after:h-1.5 after:bg-gray-100 after:inline-block",
					{ "after:bg-blue-100": progress >= 3 }
				)}
			>
				<div
					className={cn(
						"flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0",
						{ "bg-blue-100 text-primary": progress >= 2 }
					)}
				>
					<Profilecard />
				</div>
			</li>
			<li className="flex items-center w-full">
				<div
					className={cn(
						"flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0",
						{ "bg-blue-100 text-primary": progress >= 3 }
					)}
				>
					<FileShield />
				</div>
			</li>
		</ol>
	);
};
