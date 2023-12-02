import { Button } from "@/components/flowbite";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const Back = () => {
	return (
		<Link href={"/dashboard"}>
			<Button color="ghost" size={"icon"}>
				<div className="flex gap-2 items-center">
					<ChevronLeft /> Back
				</div>
			</Button>
		</Link>
	);
};
