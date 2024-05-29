import { Button, Card } from "@/components/flowbite";
import { ReactNode } from "react";
import { LightOutlineArrow } from "@/assets/icons";
import Link from "next/link";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TBusinessDataFull, TProductRequest } from "@/services/business/types";
import { useGetBusinessRequest, useGetProductRequest } from "@/services/business";
import { useGetRequestQA } from "@/services/productQA";

export const SectionWrapper = ({
  children,
  title,
  morelink,
  businessRequest,
}: {
  children: ReactNode;
  title: string;
  morelink?: string;
  businessRequest?: TBusinessDataFull;
}) => {
  const productRequestId = businessRequest?.productRequest[0]?.id;

  const { setQueriesWithPath } = useGlobalFunctions();
  const getProductRequest = useGetProductRequest(productRequestId || "");
  const productRequest = getProductRequest.data?.data.data;
  const serviceId = productRequest?.product.serviceId;

  const getQueries = (requestData: TProductRequest, action?: string) => {
    let queries = [
      { name: "productId", value: requestData.productId || "" },
      { name: "requestId", value: requestData.id },
    ];
    return queries;
  };

  const navigateTooDetail = () => {
    if (productRequest) {
      setQueriesWithPath({
        path: `/requests/detail/${businessRequest?.id}`,
        queries: getQueries(productRequest),
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1 shadow-md rounded-lg p-4 pt-6 max-w-[700px] lg:min-w-[450px]">
      <div className="flex justify-between">
        <h5 className="sb-text-18 font-semibold leading-normal">{title}</h5>
        {morelink && (
          <Button onClick={navigateTooDetail} color="ghost">
            <LightOutlineArrow />
          </Button>
        )}
      </div>

      {children}
    </div>
  );
};
