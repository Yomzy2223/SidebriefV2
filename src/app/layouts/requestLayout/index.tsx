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
    <div className="px-5 md:pl-12 lg:pr-0 w-full flex sticky max-h-[calc(100vh-81px)] overflow-auto">
      <div className="flex flex-col gap-6 items-stretch sticky top-0 w-full py-6 md:pt-16 md:pb-20 md:flex-row md:gap-10 lg:gap-24 md:items-baseline">
        <div className="flex-shrink-0">
          <LaunchStepper progress={progress} />
        </div>
        {children}
      </div>
      {path !== "review" ? (
        <div className="ml-8 xl:ml-auto hidden sticky top-0 overflow-auto lg:block">
          <RequestInfoPanel />
        </div>
      ) : null}
    </div>
  );
};

export default RequestLayout;
