import { BusinessInfoReview } from "./businessInfoReview";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { ProprietorInfoReview } from "./proprietorInfoReview";

export default function Review() {
	return (
		<div className="pr-0 md:pr-20 w-full">
			<div className="space-y-14">
				<BusinessInfoReview />
				<ProprietorInfoReview />
			</div>
			<Button color="magenta" size={"lg"} className="self-start mt-8">
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>
		</div>
	);
}
