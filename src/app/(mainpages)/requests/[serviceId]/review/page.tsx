"use client";

import { BusinessInfoReview } from "./businessInfoReview";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { ProprietorInfoReview } from "./proprietorInfoReview";
import { useParams, useSearchParams } from "next/navigation";
import { useGetBusinessRequest, useSubmitProductRequest } from "@/services/business";
import { useRouter } from "next/navigation";
import RequestWrapper from "../wrapper";
import { Oval } from "react-loading-icons";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

export default function Review() {
  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  const { mutateAsync: submitRequest, isPending: submittingRequest } = useSubmitProductRequest();

  const businesssId = searchParams.get("businessId");
  const process = useGetBusinessRequest({ id: businesssId || "" });
  const router = useRouter();

  const processData = process.data?.data.data;

  const productRequestId = processData?.productRequest[0].id;

  return (
    <RequestWrapper productId={""} requestState={""} hideFAQ>
      <div className="space-y-14">
        <BusinessInfoReview />
        <ProprietorInfoReview productId={productRequestId || ""} />
      </div>
      <Button
        disabled={process.isLoading}
        onClick={async () => {
          await submitRequest({ productRequestIds: [productRequestId || ""] });
          setQueriesWithPath({ path: `/requests/success` });
        }}
        color="secondary"
        size={"lg"}
        className="self-start mt-8"
        isProcessing={submittingRequest}
        processingSpinner={<Oval color="white" strokeWidth={4} className="h-5 w-5" />}
      >
        <div className="space-x-2 flex items-center">
          <p>Submit</p>
          {!submittingRequest && <ArrowRight />}
        </div>
      </Button>
    </RequestWrapper>
  );
}
