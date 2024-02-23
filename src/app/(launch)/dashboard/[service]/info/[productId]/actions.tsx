import { z } from "zod";
import { serviceFormSubFormType } from "@/services/service/types";
import { useSaveProductQA } from "@/services/product";
import { FormItem } from "@/services/product/types";
import { useRouter, useParams } from "next/navigation";
import slugify from "slugify";

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
		const formQA: FormItem[] = Object.keys(values).map((slug) => {
			const subForm = subForms?.find(
				(el) => slugify(el.question) === slug
			);

			return {
				answer: Array.isArray(values[slug])
					? values[slug]
					: [values[slug]],
				compulsory: subForm?.compulsory,
				isGeneral: true,
				question: subForm?.question,
				type: subForm?.type,
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
