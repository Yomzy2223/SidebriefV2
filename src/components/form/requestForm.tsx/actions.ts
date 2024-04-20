import { sluggify } from "@/lib/utils";
import { useGetRequestQA, useSaveRequestQA, useUpdateRequestQA } from "@/services/productQA";
import { TFormQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { useSearchParams } from "next/navigation";

export const useActions = ({
  info,
  isServiceForm,
}: {
  info?: TServiceForm | TProductForm;
  isServiceForm: boolean;
}) => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId") || "";

  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();

  const requestQARes = useGetRequestQA(requestId);
  const requestQA = requestQARes.data?.data?.data;

  const isPending = saveRequestQA.isPending;
  const formInRequesQA = requestQA?.find((el) => el.formId === info?.id);

  const getValue = (field: TSubForm) => {
    const QASubForm = formInRequesQA?.subForm;
    const QAField = QASubForm?.find((el) => el.question === field.question);
    return QAField?.answer;
  };

  const formInfo = info?.subForm?.map((field) => {
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      selectOptions: field.options,
      compulsory: field.compulsory,
      value: getValue(field),
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
    if (formInRequesQA?.id) {
      updateRequestQA.mutate({ requestFormId: formInRequesQA.id, form: payload });
      console.log("Updated request form");
      return;
    }
    saveRequestQA.mutate({ requestId, formId: info.id, form: payload });
    console.log("Created request form");
  };

  return { formInfo, submitFormHandler, isPending };
};
