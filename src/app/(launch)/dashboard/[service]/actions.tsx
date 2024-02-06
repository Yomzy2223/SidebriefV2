import { z } from "zod";
import { serviceFormSubFormType } from "@/services/service/types";

export const useActions = ({
	isLoading,
	subForms,
}: {
	isLoading: boolean;
	subForms?: serviceFormSubFormType[];
}) => {
	// generate a zod schema based on the subforms data
	const schema =
		isLoading || subForms === undefined
			? z.object({})
			: z.object(
					Object.fromEntries(
						subForms.map((field) => {
							switch (field.type) {
								case "business-name":
									return [
										field.type,
										z
											.array(
												z
													.string()
													.min(
														1,
														"Name must have at least one character"
													)
											)
											.length(
												4,
												"Enter 4 business names"
											),
									];
								case "business-objective":
									return [
										field.type,
										z
											.array(z.string())
											.length(
												4,
												"Enter 4 business objectives"
											),
									];
								case "country":
									return [field.type, z.string()];
								// Add more cases as needed
								default:
									return [field.type, z.any()]; // Default validation if no specific type matches
							}
						})
					)
			  );

	return { schema };
};
