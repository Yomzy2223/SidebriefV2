import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const CheckBullet = ({
	active = true,
	children,
	grey,
}: {
	active?: boolean;
	children: string;
	grey?: boolean;
}) => {
	return (
		<li className="flex gap-2.5">
			<div
				className={cn(
					"text-white bg-primary rounded-full w-6 h-6 grid place-items-center",
					{ "bg-foreground-6": !active, "bg-foreground-3": grey }
				)}
			>
				<Check className="w-3.5 h-3.5" />
			</div>
			<p
				className={cn(
					"text-sm leading-normal font-semibold text-foreground-4",
					{ "font-normal text-foreground-6": !active }
				)}
			>
				{children}
			</p>
		</li>
	);
};
