"use client";

import { BusinessInfoReview } from "./businessInfoReview";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { ProprietorInfoReview } from "./proprietorInfoReview";
import { useParams } from "next/navigation";
import { useGetBusinessRequest, useSubmitProductRequest } from "@/services/business";
import { useRouter } from "next/navigation";
import RequestWrapper from "../wrapper";

export default function Review() {
  const { mutateAsync: submitRequest, isPending: submittingRequest } = useSubmitProductRequest();
  const { processId, service }: { service: string; processId: string } = useParams();
  const process = useGetBusinessRequest({ id: processId });
  const router = useRouter();

  const processData = process.data?.data.data;

  const productRequestId = processData?.productRequest[0].id;

  return (
    <RequestWrapper>
      <div className="space-y-14">
        <BusinessInfoReview productId={productRequestId || ""} />
        <ProprietorInfoReview productId={productRequestId || ""} />
      </div>
      <Button
        disabled={process.isLoading}
        onClick={async () => {
          await submitRequest({ productRequestIds: [productRequestId || ""] });
          router.push(`/request/${service}/complete`);
        }}
        color="secondary"
        size={"lg"}
        className="self-start mt-8"
        isProcessing={submittingRequest}
      >
        <div className="space-x-2 flex items-center">
          <p>Submit</p>
          <ArrowRight />
        </div>
      </Button>
    </RequestWrapper>
  );
}
