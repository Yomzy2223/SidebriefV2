import { sluggify } from "@/lib/utils";
import { useGetRequestFormQA, useSaveRequestQA, useUpdateRequestQA } from "@/services/productQA";
import { TFormQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

export const useActions = ({
  info,
  isServiceForm,
  setOnlyCreate,
  onSubmit,
}: {
  info?: TServiceForm | TProductForm;
  isServiceForm: boolean;
  setOnlyCreate: Dispatch<SetStateAction<boolean>>;
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
  const isSuccess = saveRequestQA.isSuccess || updateRequestQA.isSuccess;
  // const formInRequesQA = requestQA?.find((el) => el.formId === info?.id);
  // console.log(requestQA);

  // Returns the
  const getQAField = (question: string) => {
    const QASubForm = requestFormQA?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const filteredSubform =
    info?.subForm?.filter(
      (el) => el.type !== "document template" && el.type !== "document upload"
    ) || [];
  // Returns the information used to render the form
  const formInfo = filteredSubform.map((field) => {
    const QAField = getQAField(field.question);
    const isTextInput =
      field.type === "email" ||
      field.type === "address" ||
      field.type === "short answer" ||
      field.type === "email address";
    const isSelect =
      field.type === "select" ||
      field.type === "countries-all" ||
      field.type === "countries-operation";

    // Each field
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      selectOptions: field.options,
      compulsory: field.compulsory,
      value: isTextInput || isSelect ? QAField?.answer[0] || "" : QAField?.answer || [],
    };
  });

  // Used to create and update QA form
  const submitFormHandler = (
    values: Record<any, any>,
    reset: UseFormReset<any>,
    onlyCreate: boolean
  ) => {
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
    if (requestFormQA?.id && !onlyCreate) {
      updateRequestQA.mutate(
        { requestFormId: requestFormQA.id, form: payload },
        {
          onSuccess: (data) => {
            console.log("Updated request form");
            onSubmit && onSubmit();
          },
        }
      );
      return;
    }
    saveRequestQA.mutate(
      { requestId, formId: info.id, form: payload },
      {
        onSuccess: () => {
          if (onlyCreate) {
            setOnlyCreate(false);
            reset();
            console.log("Form reset successfully");
          } else onSubmit && onSubmit();
          console.log("Created request form");
        },
      }
    );
  };

  return { formInfo, submitFormHandler, isPending, isSuccess };
};