import { sluggify } from "@/lib/utils";
import { useSaveProductQA } from "@/services/productQA";
import { TFormQACreate, TSubformQACreate } from "@/services/productQA/types";
import { useGetServiceForms } from "@/services/service";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { useParams, useSearchParams } from "next/navigation";

export const useActions = ({
  info,
  isServiceForm,
}: {
  info?: TServiceForm | TProductForm;
  isServiceForm: boolean;
}) => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get("productId") || "";

  const saveProductQA = useSaveProductQA();

  const formInfo = info?.subForm?.map((field) => {
    const value = "values[sluggify(field.question)]";
    const rValue = `!isFileType(value) ? value : ""`;
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      selectOptions: field.options,
      compulsory: field.compulsory,
      // value: rValue,
    };
  })!;

  const submitFormHandler = (values: Record<any, any>) => {
    if (!info) return;

    const payload: TFormQACreate = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: isServiceForm,
      subForm: info.subForm.map((field) => ({
        question: field.question,
        answer: values[sluggify(field.question)],
        type: field.type,
        compulsory: field.compulsory,
        file: {
          name: "",
          link: "",
          size: "",
          type: "",
        },
      })),
    };
    saveProductQA.mutate({ requestId, form: payload });
  };

  return { formInfo, submitFormHandler, saveProductQA };
};
