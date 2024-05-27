import { RequestInfoPanel } from "@/components/cards/requestStepper/requestInfoPanel";
import { TProduct } from "@/services/product/types";
import React, { ReactNode } from "react";

const RequestWrapper = ({
  children,
  productId,
  hideFAQ,
  requestState,
}: {
  children: ReactNode;
  productId: string;
  hideFAQ?: boolean;
  requestState: string;
}) => {
  return (
    <div className="flex flex-col gap-6 w-full max-h-[calc(100vh-81px)] overflow-auto md:flex-row md:gap-10 lg:gap-16">
      <div className="flex-1 py-6 h-max px-1 md:pt-16 md:pb-20 md:max-w-[80%]">{children}</div>
      {!hideFAQ && (
        <div className="flex-[0.6] xl:ml-auto hidden sticky top-0 overflow-auto lg:block">
          <RequestInfoPanel productId={productId} requestState={requestState} />
        </div>
      )}
    </div>
  );
};

export default RequestWrapper;
