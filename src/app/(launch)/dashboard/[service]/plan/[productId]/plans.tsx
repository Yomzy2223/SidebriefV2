"use client";

import { PlanCard } from "@/components/cards/planCard";
import { Combobox } from "@/components/input/combobox";
import { serviceProductType } from "@/services/service/types";

export const Plans = ({
	loading,
	serviceProducts,
	selectPlan,
	selectedPlan,
}: {
	loading: boolean;
	serviceProducts: serviceProductType[];
	selectPlan: (a: string) => void;
	selectedPlan?: serviceProductType;
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
	);
};
