import { sluggify } from "@/lib/utils";
import {
  useDeleteRequestQA,
  useGetRequestFormQA,
  useSaveRequestQA,
  useUpdateRequestQA,
} from "@/services/productQA";
import { TFormQACreate, TFormQAGet } from "@/services/productQA/types";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const useActions = ({
  info,
  activeSubTab,
  newForm,
}: {
  info?: TServiceForm | TProductForm;
  activeSubTab: number;
  newForm: boolean;
}) => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId") || "";

  const requestFormQARes = useGetRequestFormQA({ formId: info?.id || "", requestId });
  const requestFormQA = requestFormQARes.data?.data?.data;

  // Returns the QAs for a formI
  const getQAForms = (title?: string) => {
    const activeForm = requestFormQA?.filter((el) => el.title === title) || [];
    return activeForm;
  };

  const QAForms = getQAForms(info?.title);
  const formHasTabs = QAForms?.length >= 1 && info?.type?.toLowerCase() === "person";
  const isOnLastSubTab = activeSubTab === QAForms?.length - (newForm ? 0 : 1);

  return {
    QAForms,
    formHasTabs,
    isOnLastSubTab,
  };
};

//

//

//
export const useNewFormAction = ({
  info,
  QAForm,
  isServiceForm,
  setOpenDelete,
  handeleSubmit,
  isNewForm,
  setNewForm,
  onFormDelete,
  onlyCreate,
  setOnlyCreate,
  form,
}: INewFormActionProps) => {
  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();
  const deleteRequestQA = useDeleteRequestQA();

  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") || "";

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

  // Used to construct the form
  let formInf = nonDocSubforms.map((field) => {
    const QAField = getQAField(field.question);

    const isTextInput =
      field.type === "email" ||
      field.type === "phone number" ||
      field.type === "paragraph" ||
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
      dependsOn: field.dependsOn,
      value,
    };
  });

  const formInfo = formInf?.filter((field) => {
    const dependsField = field?.dependsOn.field || "";
    let dependsOnQuestion = "";
    let showField = true;

    if (dependsField) {
      const dependsIndex = parseInt(dependsField.split(" ").pop() || "") - 1;
      if (dependsIndex) dependsOnQuestion = info.subForm[dependsIndex]?.question;
    }
    if (dependsOnQuestion) {
      const currValue = form.getValues(sluggify(dependsOnQuestion))?.toLowerCase();
      console.log(currValue);
      if (field.dependsOn?.options) {
        // showField = !!field.dependsOn?.options?.find((el) => el?.toLowerCase() === currValue);
      } else {
        showField = !!currValue;
      }
    }
    return showField;
  });

  const watchValues = (values: any) => {
    const dependsOnQuestions = [];
    return formInfo?.filter((field) => !!field.dependsOn?.field);
  };

  // Used to create and update QA form
  const submitFormHandler = (
    values: Record<any, any>
    // reset: UseFormReset<any>
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
            handeleSubmit();
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
            setOnlyCreate(false);
            if (!onlyCreate) handeleSubmit();
          } else handeleSubmit();
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

  return { submitFormHandler, deleteQAForm, deletePending, isPending, formInfo, watchValues };
};

interface INewFormActionProps {
  info: TServiceForm | TProductForm;
  QAForm?: TFormQAGet;
  isServiceForm: boolean;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  handeleSubmit: () => void;
  isNewForm?: boolean;
  setNewForm: Dispatch<SetStateAction<boolean>>;
  onFormDelete?: (isNew?: boolean) => void;
  onlyCreate: boolean;
  setOnlyCreate: Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<any, any, undefined>;
}
