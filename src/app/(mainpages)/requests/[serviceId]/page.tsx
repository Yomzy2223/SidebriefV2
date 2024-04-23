"use client";

import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import React from "react";
import { useActions } from "./actions";
import * as z from "zod";
import { ArrowRightCircle } from "lucide-react";
import { Oval } from "react-loading-icons";
import { PlanCard } from "@/components/cards/PlanCard";
import Wrapper from "./wrapper";

const ProductSelect = ({ params }: { params: { serviceId: string } }) => {
  const { formInfo, handleFormSubmit, isPending, productInfo } = useActions({
    serviceId: params.serviceId,
  });

  return (
    <Wrapper productInfo={productInfo}>
      <div className="flex flex-col mb-6">
        <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 1</h4>
        <h6 className="text-2xl leading-normal font-semibold">Select Product</h6>
      </div>

      <DynamicForm
        formInfo={formInfo}
        onFormSubmit={handleFormSubmit}
        formSchema={formSchema}
        formClassName="gap-7"
        className="gap-6"
      >
        {productInfo && (
          <PlanCard
            price={{ amount: productInfo?.amount, currency: productInfo?.currency }}
            timeline={productInfo?.timeline}
            features={productInfo?.feature}
          />
        )}
        <Button
          type="submit"
          color="secondary"
          size="xl"
          isProcessing={isPending}
          disabled={isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          className="mt-5"
        >
          <span>Continue</span> {!isPending && <ArrowRightCircle className="ml-1" />}
        </Button>
      </DynamicForm>
    </Wrapper>
  );
};

export default ProductSelect;

export const formSchema = z.object({
  country: z
    .string({ required_error: "You need to select a country" })
    .min(1, { message: "You need to select a country" }),
  product: z
    .string({ required_error: "You need to select a product" })
    .min(1, { message: "You need to select a product" }),
});
