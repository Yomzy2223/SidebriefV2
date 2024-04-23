"use client";

import { ReactNode } from "react";
import { LaunchStepper } from "@/components/cards/launchStepper";

export default function LaunchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 px-5 w-full sticky md:flex-row md:gap-10 lg:gap-16 md:pl-12 lg:pr-0">
      <div className="flex-shrink-0 sticky top-0 py-6 md:py-16">
        <LaunchStepper />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
