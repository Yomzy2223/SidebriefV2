import { sluggify } from "@/lib/utils";
import {
  useDeleteRequestQA,
  useGetRequestFormQA,
  useGetRequestQA,
  useSaveRequestQA,
  useUpdateRequestQA,
} from "@/services/productQA";
import { TFormQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { TabsRef } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { Dispatch, RefObject, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

export const useActions = ({
  info,
  isServiceForm,
  setOnlyCreate,
  onSubmit,
  activeSubTab,
  setActiveSubTab,
  tabsRef,
  newForm,
  newFormInfo,
  setNewForm,
  setOpenDelete,
}: {
  info?: TServiceForm | TProductForm;
  isServiceForm: boolean;
  setOnlyCreate: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  activeSubTab: number;
  setActiveSubTab: (active: number) => void;
  tabsRef: RefObject<TabsRef>;
  newForm: boolean;
  newFormInfo: Record<any, any>;
  setNewForm: Dispatch<SetStateAction<boolean>>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId") || "";

  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();
  const deleteRequestQA = useDeleteRequestQA();

  const requestQARes = useGetRequestQA(requestId);
  const requestQA = requestQARes.data?.data?.data;
  const requestFormQA = requestQA?.filter((el) => el.formId === info?.id);

  // const requestFormQARes = useGetRequestFormQA({ formId: info?.id || "", requestId });
  // const requestFormQ = requestFormQARes.data?.data?.data;

  const isPending = saveRequestQA.isPending || updateRequestQA.isPending;
  const isSuccess = saveRequestQA.isSuccess || updateRequestQA.isSuccess;
  // const formInRequesQA = requestQA?.find((el) => el.formId === info?.id);
  // console.log(requestQA);

  // Returns the QAs for a formI
  const getQAForms = (title?: string) => {
    const activeForm = requestFormQA?.filter((el) => el.title === title) || [];
    return activeForm;
  };

  const QAForms = getQAForms(info?.title);
  const formHasTabs = QAForms?.length >= 1;
  const activeForm = QAForms?.[formHasTabs ? activeSubTab : 0] || {};
  const isOnLastSubTab = activeSubTab === QAForms?.length;

  // Returns the QA for a field
  const getQAField = (question: string) => {
    // const QASubForm = requestFormQA?.subForm;
    const QASubForm = activeForm?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const nonDocSubforms =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return !isDoc;
    }) || [];
  // Returns the information used to render the form
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
    if (formHasTabs && isOnLastSubTab) value = newFormInfo[sluggify(field.question)];

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
    values: Record<any, any>,
    reset: UseFormReset<any>,
    onlyCreate: boolean
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
      subForm: nonDocSubforms.map((field) => ({
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

    if (activeForm?.id && !onlyCreate) {
      updateRequestQA.mutate(
        { requestFormId: activeForm.id, form: payload },
        {
          onSuccess: (data) => {
            console.log("Updated request form");
            if (!formHasTabs || QAForms?.length - 1 === activeSubTab) {
              onSubmit && onSubmit();
              return;
            }
            tabsRef.current?.setActiveTab(activeSubTab + 1); //navigate to the next sub tab
            setActiveSubTab(activeSubTab + 1);
            // document
            //   .getElementById("subFormTabs" + activeSubTab)
            //   ?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
            setNewForm(false);
            reset();
            console.log("Form reset successfully");
          } else onSubmit && onSubmit();
          console.log("Created request form");
        },
      }
    );
  };

  const deleteQAForm = () => {
    deleteRequestQA.mutate(
      { requestFormId: activeForm.id },
      {
        onSuccess: () => setOpenDelete(false),
      }
    );
  };
  const deletePending = deleteRequestQA.isPending;

  return {
    formInfo,
    submitFormHandler,
    isPending,
    isSuccess,
    QAForms,
    deleteQAForm,
    deletePending,
    formHasTabs,
    isOnLastSubTab,
  };
};
