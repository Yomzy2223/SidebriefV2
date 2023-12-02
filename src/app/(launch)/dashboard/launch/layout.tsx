"use client";

import { ReactNode } from "react";
import { RequestInfoPanel } from "@/components/features/requestInfoPanel";
import { LaunchStepper } from "@/components/stepper/launch";
import { usePathname } from "next/navigation";

export default function LaunchLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	const path = pathname.split("/")[pathname.split("/").length - 1];

	let progress: number;

	switch (path) {
		case "launch":
			progress = 1;
			break;
		case "plan":
			progress = 2;
			break;
		case "payment":
			progress = 3;
			break;
		case "kyc":
			progress = 4;
			break;
		case "review":
			progress = 5;
			break;
		default:
			progress = 0;
			break;
	}

	return (
		<div className="px-5 md:pl-12 lg:pr-0 w-full flex">
			<div className="py-6 md:pt-16 md:pb-20 flex flex-col w-full md:flex-row gap-6 md:gap-10 lg:gap-24 items-stretch md:items-baseline">
				<div className="flex-shrink-0">
					<LaunchStepper progress={progress} />
				</div>
				{children}
			</div>
			{path !== "review" ? (
				<div className="ml-8 xl:ml-auto hidden lg:block">
					<RequestInfoPanel />
				</div>
			) : null}
		</div>
	);
}
