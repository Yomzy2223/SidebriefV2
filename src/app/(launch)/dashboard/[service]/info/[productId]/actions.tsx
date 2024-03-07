import { z } from "zod";
import { serviceFormSubFormType, serviceFormType } from "@/services/service/types";
import { useSaveProductQA } from "@/services/product";
import { FormItem } from "@/services/product/types";
import { useRouter, useParams } from "next/navigation";
import { sluggify } from "@/lib/utils";
import { productFormType } from "@/services/product/types";

// typescript type guard
function isServiceFormType(form: any): form is serviceFormType {
  return "serviceCategoryId" in form;
}

export const useActions = ({ form }: { form: serviceFormType | productFormType }) => {
  const saveProductQA = useSaveProductQA();

  const saveFormProductQA = async (
    productId: string,
    values: { [x: string]: string | string[] },
    isGeneral?: boolean
  ) => {
    const formQA: FormItem[] = Object.keys(values).map((slug) => {
      const subForm = isServiceFormType(form)
        ? form.subForm?.find((el) => sluggify(el.question) === slug)
        : form.productSubForm?.find((el) => sluggify(el.question) === slug);

      return {
        question: subForm?.question,
        answer: Array.isArray(values[slug]) ? values[slug] : [values[slug]],
        compulsory: subForm?.compulsory,
        isGeneral: true,
        type: subForm?.type,
      } as FormItem;
    });

    // save the questions
    return await saveProductQA.mutateAsync(
      {
        productId,
        form: {
          title: form.title,
          description: form.description,
          type: form.type,
          compulsory: form.compulsory,
          isGeneral: isGeneral || false,
          subForm: formQA,
        },
      },
      {
        // 	onSuccess: (data) => {
        // 		router.push(
        // 			`/dashboard/${params.service}/plan/${productId}`
        // 		);
        // 	},
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
