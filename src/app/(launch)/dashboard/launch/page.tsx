import { LaunchForm1 } from "./form";

export default function LaunchStart() {
	return (
		<div className="flex flex-col gap-6 max-w-[500px]">
			<div className="flex flex-col">
				<h4 className="text-sm leading-normal text-foreground-3 mb-1">
					STEP 1
				</h4>
				<h6 className="text-2xl leading-normal font-semibold">
					Business profile
				</h6>
				<p className="font-medium leading-normal text-primary">
					Give the business a face
				</p>
			</div>
			<LaunchForm1 />
		</div>
	);
}
