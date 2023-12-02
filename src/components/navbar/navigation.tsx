import Link from "next/link";
import { Button } from "@/components/flowbite";
import { cn } from "@/lib/utils";
import { navroutes } from "./constants";

export const Navigation = () => {
	return (
		<div className="py-5 md:flex lg:gap-4 flex-wrap w-full hidden">
			{navroutes.map((el, i) => (
				<Link key={i} href={el.to}>
					<Button
						color={el.active ? "primary" : "ghost"}
						className={cn("text-gray-500", {
							"text-primary-foreground": el.active,
						})}
					>
						{el.name}
					</Button>
				</Link>
			))}
		</div>
	);
};
