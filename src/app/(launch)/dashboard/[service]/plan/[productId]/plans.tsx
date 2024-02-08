"use client";

import { PlanCard } from "@/components/cards/planCard";
import { Combobox } from "@/components/input/combobox";

export const Plans = () => {
	return (
		<div className="flex flex-col space-y-7 md:max-w-[500px]">
			<Combobox
				options={[]}
				selectValue={() => {}}
				label="Choose Plan of Choice"
			/>
			<PlanCard />
		</div>
	);
};
