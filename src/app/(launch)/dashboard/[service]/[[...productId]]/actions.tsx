import { z } from "zod";
import { serviceFormSubFormType } from "@/services/service/types";
import { useSaveProductQA } from "@/services/product";
import { FormItem } from "@/services/product/types";
import { useRouter, useParams } from "next/navigation";

export const useActions = ({
	isLoading = false,
	subForms,
}: {
	isLoading?: boolean;
	subForms?: serviceFormSubFormType[];
}) => {
	const saveProductQA = useSaveProductQA();
	const router = useRouter();
	const params: { service: string } = useParams();

	// generate a zod schema based on the subforms data
	const schema =
		isLoading || subForms === undefined
			? z.object({})
			: z.object(
					Object.fromEntries(
						subForms.map((field) => {
							switch (field.type) {
								case "business name":
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
								case "objectives":
									// let objectivesSchema = z.array(z.string());
									// if (field.compulsory) {
									// 	objectivesSchema =
									// 		objectivesSchema.length(
									// 			4,
									// 			"Enter  4 business objectives"
									// 		);
									// }
									// return [field.type, objectivesSchema];
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

	const defaultValues =
		isLoading || subForms === undefined
			? {}
			: Object.entries(
					subForms.map((field) => {
						switch (field.type) {
							case "business name":
								return [field.type, []];
							case "objectives":
								return [field.type, []];
							default:
								return [field.type, ""];
						}
					})
			  );

	const saveFormProductQA = (
		productId: string,
		values: { [x: string]: string | string[] }
	) => {
		const formQA: FormItem[] = Object.keys(values).map((type) => {
			const subForm = subForms?.find((el) => el.type === type);

			return {
				answer: Array.isArray(values[type])
					? values[type]
					: [values[type]],
				compulsory: subForm?.compulsory,
				isGeneral: true,
				question: subForm?.question,
				type: type,
			} as FormItem;
		});

		// save the questions
		saveProductQA.mutate(
			{ productId, form: formQA },
			{
				onSuccess: (data) => {
					router.push(
						`/dashboard/${params.service}/plan/${productId}`
					);
				},
				onError: (err) => {
					console.log(err);
				},
			}
		);
	};

	return {
		schema,
		defaultValues,
		saveFormProductQA,
		savingForm: saveProductQA.isPending,
	};
};
