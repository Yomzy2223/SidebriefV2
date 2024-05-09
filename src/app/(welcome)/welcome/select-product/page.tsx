"use client";

import React, { useState } from "react";
import { IProductFull } from "@/hooks/api/types";
import useProductApi from "@/hooks/useProductApi";
import { useRouter, useSearchParams } from "next/navigation";
import { PlanCard } from "@/components/cards/PlanCard";
import { AuthStepper } from "@/app/(welcome)/auth/authStepper";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import useRequestApi from "@/hooks/useRequestApi";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import { useCreateBusinessRequest } from "@/services/business";

const SelectProduct = () => {
  const [selectedPlan, setSelectedPlan] = useState<IProductFull>();
  const session = useSession();
  const userId = session.data?.user?.id;

  const { get } = useSearchParams();
  const serviceId = get("serviceId") || "";
  const country = get("country") || "";

  const createRequestMutation = useCreateBusinessRequest();

  const productLoading = createRequestMutation.isPending;

  const { useGetCountryServiceProductsQuery } = useProductApi();
  const { data, isLoading } = useGetCountryServiceProductsQuery({ serviceId, country });
  const productsData = data?.data?.data;
  const products = productsData?.map((el: IProductFull) => el.name);

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelect = (selected?: string) => {
    const selectedProduct = productsData?.find((el: IProductFull) => el.name === selected);
    setSelectedPlan(selectedProduct);
  };

  const createProduct = () => {
    const payload = { userId: userId || "", productId: selectedPlan?.id || "" };
    createRequestMutation.mutate(payload, { onSuccess: () => router.push("/dashboard") });
  };

  const handleBack = () => {
    router.push("/welcome/select-country?" + searchParams.toString());
  };

  return (
    <div>
      <h2 className="hidden sb-text-32 font-semibold mb-2 sm:flex">Kindly select a product</h2>

      <h3 className="mb-7 font-normal text-foreground-3 sm:mt-10">WELCOME TO SIDEBRIEF</h3>

      <div className="flex flex-col gap-9 mb-12 ">
        <ComboBox
          name="product"
          options={products || []}
          handleSelect={onSelect}
          optionsLoading={isLoading}
        />

        {selectedPlan && (
          <PlanCard
            features={selectedPlan?.feature}
            price={{
              amount: selectedPlan?.amount,
              currency: selectedPlan?.currency,
            }}
            timeline={selectedPlan.timeline}
          />
        )}
      </div>

      <AuthStepper progress={4} />

      <div className="flex justify-between mt-7 md:mt-9">
        <Button
          color="plain"
          size="fit"
          className="text-destructive-foreground"
          onClick={handleBack}
        >
          Go back
        </Button>
        <Button
          color="secondary"
          onClick={createProduct}
          disabled={!selectedPlan || productLoading}
          isProcessing={productLoading}
        >
          Done
          {!productLoading && <ArrowRightCircle className="ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default SelectProduct;
