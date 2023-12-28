import { Plans } from "./plans";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";

export default function RegistrationPlan() {
	return (
		<div className="flex flex-col gap-6 md:max-w-[500px] w-full">
			<div className="flex flex-col">
				<h4 className="text-sm leading-normal text-foreground-3 mb-1">
					STEP 2
				</h4>
				<h6 className="text-2xl leading-normal font-semibold">
					Registration Plan
				</h6>
				{/* <p className="font-medium leading-normal text-primary">
					Give the business a face
				</p> */}
			</div>
			<Plans />
			<Button color="magenta" size={"lg"} className="self-start">
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>
		</div>
	);
}
