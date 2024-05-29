import { Badge, Button } from "flowbite-react";
import { ArrowRightCircle, InfoIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSteps } from "./constants";
import { useSession } from "next-auth/react";
import { OngoingRegSkeleton } from "./skeleton";
import { useGetProductRequest } from "@/services/business";
import { useGetServiceForms } from "@/services/service";
import { getStatusBadgeColor, useGlobalFunctions } from "@/hooks/globalFunctions";
import { TProductRequest } from "@/services/business/types";
import { useGetProductForms } from "@/services/product";

const OngoingRegSection = ({
  mostRecentPending,
  isLoading,
}: {
  mostRecentPending: TProductRequest;
  isLoading: boolean;
}) => {
  const session = useSession();

  const { setQueriesWithPath } = useGlobalFunctions();

  const productRequestId = mostRecentPending.id;

  const getProductRequest = useGetProductRequest(productRequestId);
  const productRequest = getProductRequest.data?.data?.data;

  const serviceId = productRequest?.product.serviceId;

  const productFormsRes = useGetProductForms(getProductRequest.data?.data.data.productId || "");
  const productForms = productFormsRes.data?.data?.data;
  const hasPForms = (productFormsRes.data?.data?.data?.length ?? 0) > 0;
  const serviceFormsRes = useGetServiceForms(serviceId || "");
  const serviceForm = serviceFormsRes.data?.data.data;
  const hasSForms = (serviceForm?.length ?? 0) > 0;

  const { steps } = useSteps({
    productRequest,
    serviceForm,
    productForms,
  });

  const loading =
    session.status === "loading" ||
    isLoading ||
    getProductRequest.isLoading ||
    productFormsRes.isLoading ||
    serviceFormsRes.isLoading;

  if (loading) {
    return <OngoingRegSkeleton />;
  }

  let urlSuffix = "info";

  // Find the first step that is not done
  for (let i = 0; i < steps.length; i++) {
    if (!steps[i].done) {
      switch (steps[i].step) {
        case "Step 2":
          urlSuffix = "info";
          break;
        case "Step 3":
          // urlSuffix = "payment";
          urlSuffix = "forms";
          break;
        case "Step 4":
          urlSuffix = "forms";
          break;
        default:
          urlSuffix = "info";
      }
      break;
    }
  }

  const getQueries = (requestData: TProductRequest, action?: string) => {
    let queries = [
      { name: "productId", value: getProductRequest.data?.data.data.productId || "" },
      { name: "requestId", value: requestData.id },
      { name: "hasSForms", value: hasSForms.toString() },
      { name: "hasPForms", value: hasPForms.toString() },
    ];
    if (hasSForms) {
      queries = [...queries, { name: "activeTab", value: "0" }];
    }
    if (action === "createReq" || action === "createBusiness") {
      queries = [...queries, { name: "progress", value: "1" }];
    }
    if (action === "createBusiness") {
      queries = [...queries, { name: "businessId", value: requestData.businessId }];
    }
    return queries;
  };

  let status: string = mostRecentPending?.status;
  switch (mostRecentPending?.status) {
    case "ASSIGNED":
      status = "INPROGRESS";
      break;
    case "ACCEPTED":
      status = "INPROGRESS";
      break;
    case "REJECTED":
      status = "INPROGRESS";
      break;
  }

  return (
    <div className="flex flex-col gap-9 bg-accent rounded-lg">
      <div className="flex justify-between flex-col gap-6 px-8 pb-5 py-1.5 m-0.5 bg-white rounded-t rounded-lg md:flex-row">
        <div className="md:max-w-[50%]">
          <div className="flex items-center gap-4">
            <h2 className="sb-text-24 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] 2xl:max-w-[800px]">
              {productRequest?.product?.name || ""}
            </h2>
            <Badge color={getStatusBadgeColor(status)} icon={() => <InfoIcon size={10} />}>
              {status}
            </Badge>
          </div>
          <p className="text-sm w-4/5">
            Welcome back! Let&#39;s pick up where you left off and get your business up and running
            smoothly
          </p>
        </div>
        <div className="flex items-center gap-10 md:gap-16">
          <Button size="fit" color="ghost" className="underline text-destructive-foreground">
            Delete
          </Button>
          <Button
            color="secondary"
            className="md:px-6 md:py-1.5"
            onClick={() => {
              const productData = getProductRequest.data?.data.data;
              if (productData) {
                setQueriesWithPath({
                  path: `/requests/${serviceId}/${urlSuffix}`,
                  queries: getQueries(productData),
                });
              }
            }}
          >
            Resume
            <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
          </Button>
          {/* </Link> */}
        </div>
      </div>

      <div className="flex overflow-auto gap-2.5 mx-8 mb-8">
        {steps.map((el) => {
          const done = el.done;

          return (
            <div
              key={el.step}
              className="flex flex-col justify-between gap-1 border border-border px-6 py-5 text-sm text-foreground-3 font-normal rounded bg-white min-w-[250px]"
            >
              <Image src={el.icon} alt="" className="w-[60px] h-auto mb-4" />
              <div>
                <p className="uppercase mb-1">{el.step}</p>
                <p>{el.description}</p>
                <Badge
                  icon={() => <InfoIcon size={10} />}
                  color={done ? "success" : "failure"}
                  className="align-middle w-max mt-1"
                >
                  {done ? "Done" : "Not done yet"}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OngoingRegSection;
