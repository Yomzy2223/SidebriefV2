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

  // Returns the
  const getQAField = (question: string) => {
    const QASubForm = requestFormQA?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const filteredSubform = info?.subForm?.filter(
    (el) => el.type !== "document template" && el.type !== "document upload"
  );
  // Returns the information used to render the form
  const formInfo = filteredSubform?.map((field) => {
    const QAField = getQAField(field.question);
    const isTextInput =
      QAField?.type === "email" ||
      QAField?.type === "address" ||
      QAField?.type === "short answer" ||
      QAField?.type === "email address";

    // Each field
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      selectOptions: field.options,
      compulsory: field.compulsory,
      // value: isTextInput ? QAField?.answer[0] || "" : QAField?.answer || [],
      value: isTextInput ? "" : [],
    };
  });

  // Used to create and update QA form
  const submitFormHandler = (values: Record<any, any>) => {
    if (!info) return;

    const payload: TFormQACreate = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: isServiceForm,
      subForm: info.subForm.map((field) => ({
        id: getQAField(field.question)?.id,
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
        {
          onSuccess: (data) => {
            console.log("Updated request form");
            onSubmit();
          },
        }
      );
      return;
    }
    saveRequestQA.mutate(
      { requestId, formId: info.id, form: payload },
      {
        onSuccess: () => {
          onSubmit();
          console.log("Created request form");
        },
      }
    );
  };

  return { formInfo, submitFormHandler, isPending };
};
