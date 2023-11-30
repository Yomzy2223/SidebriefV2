import { ReactNode } from "react";
import { RequestInfoPanel } from "@/components/features/requestInfoPanel";
import { LaunchStepper } from "@/components/stepper/launch";

export default function LaunchLayout({ children }: { children: ReactNode }) {
	return (
		<div className="pl-12 w-full flex">
			<div className="pt-16 pb-20 flex gap-24 items-baseline">
				<LaunchStepper />
				{children}
			</div>
			<div className="ml-auto">
				<RequestInfoPanel />
			</div>
		</div>
	);
}
