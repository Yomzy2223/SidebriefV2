"use client";

import { PlanCard } from "@/components/cards/PlanCard";
import { Combobox } from "@/components/input/combobox";
import { IProduct } from "@/services/service/types";
import { Puff } from "react-loading-icons";

export const Plans = ({
  loading,
  serviceProducts,
  selectPlan,
  selectedPlan,
}: {
  loading: boolean;
  serviceProducts: IProduct[];
  selectPlan: (a: string) => void;
  selectedPlan?: IProduct;
}) => {
  return (
    <div className="flex flex-col space-y-7 md:max-w-[500px]">
      <Combobox
        options={serviceProducts.map((el) => el.name)}
        selectValue={selectPlan}
        label="Choose Plan of Choice"
        isLoading={loading}
        value={selectedPlan?.name}
      />
      {loading ? (
        <div className="w-[500px] h-[200px] grid place-items-center">
          <Puff stroke="#00A2D4" />
        </div>
      ) : (
        selectedPlan && (
          <PlanCard
            features={selectedPlan?.feature}
            price={{
              amount: selectedPlan?.amount,
              currency: selectedPlan?.currency,
            }}
            timeline={selectedPlan.timeline}
          />
        )
      )}
    </div>
  );
};