import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { sluggify } from "@/lib/utils";
import {
  useGetRequestQA,
  useGetRequestFormQA,
  useSaveRequestQA,
  useUpdateRequestQA,
} from "@/services/productQA";
import { TFormQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { useSearchParams } from "next/navigation";

export const useActions = ({
  info,
  isServiceForm,
  onSubmit,
}: {
  info?: TServiceForm | TProductForm;
  isServiceForm: boolean;
  onSubmit: () => void;
}) => {
  const { setQueriesWithPath } = useGlobalFunctions();
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId") || "";

  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();

  // const requestQARes = useGetRequestQA(requestId);
  // const requestQA = requestQARes.data?.data?.data;

  const requestFormQARes = useGetRequestFormQA(info?.id || "");
  const requestFormQA = requestFormQARes.data?.data?.data;
  // console.log(requestFormQA);

  const isPending = saveRequestQA.isPending || updateRequestQA.isPending;
  // const formInRequesQA = requestQA?.find((el) => el.formId === info?.id);
  // console.log(requestQA);

  const getValue = (field: TSubForm) => {
    const QASubForm = requestFormQA?.subForm;
    const QAField = QASubForm?.find((el) => el.question === field.question);
    const isTextInput =
      QAField?.type === "email" ||
      QAField?.type === "address" ||
      QAField?.type === "short answer" ||
      QAField?.type === "email address";
    return isTextInput ? QAField?.answer[0] : QAField?.answer;
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
  // console.log(formInfo);

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
    if (requestFormQA?.id) {
      updateRequestQA.mutate(
        { requestFormId: requestFormQA.id, form: payload },
        { onSuccess: () => onSubmit() }
      );
      console.log("Updated request form");
      return;
    }
    saveRequestQA.mutate(
      { requestId, formId: info.id, form: payload },
      { onSuccess: () => onSubmit() }
    );
    console.log("Created request form");
  };

  return { formInfo, submitFormHandler, isPending };
};
