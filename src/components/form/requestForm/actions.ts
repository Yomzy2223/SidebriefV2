import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { sluggify } from "@/lib/utils";
import {
  useDeleteRequestQA,
  useGetRequestFormQA,
  useGetRequestQA,
  useSaveRequestQA,
  useUpdateRequestQA,
} from "@/services/productQA";
import { TFormQACreate, TFormQAGet } from "@/services/productQA/types";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { TabsRef } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { Dispatch, RefObject, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import { IFormInput } from "../constants";

export const useActions = ({
  info,
  activeSubTab,
}: {
  info?: TServiceForm | TProductForm;
  activeSubTab: number;
}) => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId") || "";

  const requestQARes = useGetRequestQA(requestId);
  const requestQA = requestQARes.data?.data?.data;
  const requestFormQA = requestQA?.filter((el) => el.formId === info?.id);

  // Returns the QAs for a formI
  const getQAForms = (title?: string) => {
    const activeForm = requestFormQA?.filter((el) => el.title === title) || [];
    return activeForm;
  };

  const QAForms = getQAForms(info?.title);
  const formHasTabs = QAForms?.length >= 1;
  const isOnLastSubTab = activeSubTab === QAForms?.length;

  return {
    QAForms,
    formHasTabs,
    isOnLastSubTab,
  };
};

export const useNewFormAction = ({
  info,
  QAForm,
  isServiceForm,
  setOpenDelete,
  handelSubmit,
  isNewForm,
  setNewForm,
  onFormDelete,
}: INewFormActionProps) => {
  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();
  const deleteRequestQA = useDeleteRequestQA();

  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") || "";

  const { setQueriesWithPath } = useGlobalFunctions();
  const setActiveSubTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeSubTab", value: active.toString() }] });

  // Returns the QA for a field
  const getQAField = (question: string) => {
    // const QASubForm = requestFormQA?.subForm;
    const QASubForm = QAForm?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const nonDocSubforms =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return !isDoc;
    }) || [];

  const formInfo = nonDocSubforms.map((field) => {
    const QAField = getQAField(field.question);

    const isTextInput =
      field.type === "email" ||
      field.type === "phone number" ||
      field.type === "paragraph" ||
      field.type === "address" ||
      field.type === "promocode" ||
      field.type === "short answer";
    const isSelect =
      field.type === "select" ||
      field.type === "countries-all" ||
      field.type === "countries-operation" ||
      field.type === "multiple choice";

    let value = isTextInput || isSelect ? QAField?.answer[0] || "" : QAField?.answer || [];

    // Each field
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      selectOptions: field.options,
      compulsory: field.compulsory,
      value,
    };
  });

  // Used to create and update QA form
  const submitFormHandler = (
    values: Record<any, any>
    // reset: UseFormReset<any>,
    // onlyCreate: boolean
  ) => {
    if (!info) return;

    const getAnswer = (field: TSubForm) => {
      let answer = values[sluggify(field.question)];
      if (typeof answer === "number") answer = answer.toString();
      return answer;
    };

    const payload: TFormQACreate = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: isServiceForm,
      subForm: info.subForm.map((field) => ({
        id: getQAField(field.question)?.id,
        question: field.question,
        answer: getAnswer(field),
        type: field.type,
        compulsory: field.compulsory,
        fileName: "",
        fileLink: "",
        fileType: "",
        fileSize: "",
      })),
    };

    if (QAForm?.id) {
      updateRequestQA.mutate(
        { requestFormId: QAForm.id, form: payload },
        {
          onSuccess: (data) => {
            handelSubmit();
            console.log("Updated request form");
          },
        }
      );
      return;
    }
    saveRequestQA.mutate(
      { requestId, formId: info.id, form: payload },
      {
        onSuccess: (data) => {
          if (isNewForm) {
            setNewForm(false);
            // reset();
            console.log("Form reset successfully");
          } else handelSubmit();
          console.log("Created request form");
        },
      }
    );
  };

  const deleteQAForm = () => {
    deleteRequestQA.mutate(
      { requestFormId: QAForm?.id || "" },
      {
        onSuccess: () => {
          setOpenDelete(false);
          onFormDelete && onFormDelete();
        },
      }
    );
  };

  const deletePending = deleteRequestQA.isPending;
  const isPending = saveRequestQA.isPending || updateRequestQA.isPending;

  return { submitFormHandler, deleteQAForm, deletePending, isPending, formInfo };
};

interface INewFormActionProps {
  info: TServiceForm | TProductForm;
  QAForm?: TFormQAGet;
  isServiceForm: boolean;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  handelSubmit: () => void;
  isNewForm?: boolean;
  setNewForm: Dispatch<SetStateAction<boolean>>;
  onFormDelete?: (isNew?: boolean) => void;
}
