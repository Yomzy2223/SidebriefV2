import { z } from "zod";
import { serviceFormSubFormType } from "@/services/service/types";
import { useSaveProductQA } from "@/services/product";
import { FormItem } from "@/services/product/types";
import { useRouter, useParams } from "next/navigation";

export const useActions = ({
	subForms,
}: {
	subForms?: serviceFormSubFormType[];
}) => {
	const saveProductQA = useSaveProductQA();
	const router = useRouter();
	const params: { service: string } = useParams();

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
		saveFormProductQA,
		savingForm: saveProductQA.isPending,
	};
};
