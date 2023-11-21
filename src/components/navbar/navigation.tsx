import Link from "next/link";
import { Button } from "@/components/flowbite";
import { cn } from "@/lib/utiils";

const navroutes = [
	{
		name: "Home",
		to: "/",
		active: true,
	},
	{
		name: "Business Registration",
		to: "/",
		active: false,
	},
	{
		name: "Manage Business",
		to: "/",
		active: false,
	},
	{
		name: "Diligence",
		to: "/",
		active: false,
	},
	{
		name: "Compliance",
		to: "/",
		active: false,
	},
	{
		name: "Bank Account",
		to: "/",
		active: false,
	},
	{
		name: "Settings",
		to: "/",
		active: false,
	},
];

export const Navigation = () => {
	return (
		<div className="py-5 flex">
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
