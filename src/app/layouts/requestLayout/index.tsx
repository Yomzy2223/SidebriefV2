import React, { ReactNode } from "react";
import { LaunchStepper } from "./launchStepper";
import { RequestInfoPanel } from "./requestInfoPanel";

const RequestLayout = ({
  children,
  path,
  progress,
}: {
  children: ReactNode;
  path: string;
  progress: number;
}) => {
  return (
    <div className="flex flex-col gap-6 px-5 w-full sticky max-h-[calc(100vh-81px)] overflow-auto md:flex-row md:gap-10 lg:gap-24 md:pl-12 lg:pr-0">
      <div className="flex-shrink-0 sticky top-0 py-6 md:py-16">
        <LaunchStepper progress={progress} />
      </div>
      <div className="flex-1 py-6 md:pt-16 md:pb-20">{children}</div>
      {path !== "review" ? (
        <div className="flex-[0.6] xl:ml-auto hidden sticky top-0 overflow-auto lg:block">
          <RequestInfoPanel />
        </div>
      ) : null}
    </div>
  );
};

export default RequestLayout;
