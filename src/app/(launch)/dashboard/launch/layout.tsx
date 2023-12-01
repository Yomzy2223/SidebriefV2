import { ReactNode } from "react";
import { RequestInfoPanel } from "@/components/features/requestInfoPanel";
import { LaunchStepper } from "@/components/stepper/launch";

export default function LaunchLayout({ children }: { children: ReactNode }) {
	return (
		<div className="px-5 md:pl-12 lg:pr-0 w-full flex">
			<div className="py-6 md:pt-16 md:pb-20 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-24 items-stretch md:items-baseline">
				<LaunchStepper />
				{children}
			</div>
			<div className="ml-8 xl:ml-auto hidden lg:block">
				<RequestInfoPanel />
			</div>
		</div>
	);
}
