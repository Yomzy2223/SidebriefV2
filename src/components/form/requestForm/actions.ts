import { sluggify } from "@/lib/utils";
import {
  useDeleteRequestQA,
  useGetRequestFormQA,
  useSaveRequestQA,
  useUpdateRequestQA,
} from "@/services/productQA";
import { TFormQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm } from "@/services/service/types";
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
  showOnlyDocs,
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
  showOnlyDocs?: boolean;
}) => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId") || "";

  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();
  const deleteRequestQA = useDeleteRequestQA();

  // const requestQARes = useGetRequestQA(requestId);
  // const requestQA = requestQARes.data?.data?.data;

  const requestFormQARes = useGetRequestFormQA(info?.id || "");
  const requestFormQA = requestFormQARes.data?.data?.data;
  // console.log(requestFormQA);

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
  const activeForm = QAForms?.[activeSubTab] || {};

  // Returns the QA for a field
  const getQAField = (question: string) => {
    // const QASubForm = requestFormQA?.subForm;
    const QASubForm = activeForm?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const filteredSubform =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      if (showOnlyDocs) return isDoc;
      else return !isDoc;
    }) || [];
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

    let value = isTextInput || isSelect ? QAField?.answer[0] || "" : QAField?.answer || [];
    if (activeSubTab === QAForms?.length) value = newFormInfo[sluggify(field.question)];

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
            if (QAForms?.length - 1 === activeSubTab) {
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
  };
};
