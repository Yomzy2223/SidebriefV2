import { uploadFileToCloudinary, useGlobalFunctions } from "@/hooks/globalFunctions";
import { sluggify } from "@/lib/utils";
import { useGetRequestFormQA, useUpdateRequestQA } from "@/services/productQA";
import { TFormQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { TabsRef } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { Dispatch, RefObject, SetStateAction } from "react";

export const useActions = ({
  info,
  isServiceForm,
  onSubmit,
  activeSubTab,
  setActiveSubTab,
  tabsRef,
  setIsUploading,
}: {
  info?: TServiceForm | TProductForm;
  isServiceForm: boolean;
  onSubmit: () => void;
  activeSubTab: number;
  setActiveSubTab: (active: number) => void;
  tabsRef: RefObject<TabsRef>;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const { userCloudFolder } = useGlobalFunctions();

  const requestId = searchParams.get("requestId") || "";

  const updateRequestQA = useUpdateRequestQA();

  // const requestQARes = useGetRequestQA(requestId);
  // const requestQA = requestQARes.data?.data?.data;

  const requestFormQARes = useGetRequestFormQA({ formId: info?.id || "", requestId });
  const requestFormQA = requestFormQARes.data?.data?.data;
  // console.log(requestFormQA);

  const isPending = updateRequestQA.isPending;
  const isSuccess = updateRequestQA.isSuccess;
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

  const docSubforms =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return isDoc;
    }) || [];

  const docTemplateSubforms = docSubforms.filter((el) => el.type === "document template") || [];

  const nonDocSubforms =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return !isDoc;
    }) || [];
  const nonDocSubformsUpdated = nonDocSubforms?.map((el) => ({
    id: el.id,
    question: el.question,
    answer: getQAField(el.question)?.answer || [],
    type: el.type,
    compulsory: el.compulsory,
    fileName: "",
    fileLink: "",
    fileType: "",
    fileSize: "",
  }));

  // Returns the information used to render the form
  const formInfo = docSubforms.map((field) => {
    const QAField = getQAField(field.question);
    // Each field
    return {
      id: field.id,
      name: sluggify(field.question),
      label: field.question,
      type: field.type,
      selectOptions: field.options,
      compulsory: field.compulsory,
      fileName: QAField?.fileName,
      fileLink: QAField?.fileLink,
      fileType: QAField?.fileType,
      fileSize: QAField?.fileSize,
    };
  });

  // Used to create and update QA form
  const submitFormHandler = async (values: Record<any, any>) => {
    if (!info) return;

    setIsUploading(true);
    const resArray = await Promise.all(
      docSubforms.map(async (el, i: number) => {
        const uploadRes = await uploadFileToCloudinary({
          file: values[sluggify(el.question)],
          folderName: userCloudFolder,
        });
        return uploadRes;
        // return {

        // }
      })
    );
    setIsUploading(false);
    if (!resArray) return;

    const payload = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: isServiceForm,
      subForm: [
        ...nonDocSubformsUpdated,
        ...docSubforms.map((field, i) => ({
          id: getQAField(field.question)?.id,
          question: field.question,
          answer: getQAField(field.question)?.answer || [],
          type: field.type,
          compulsory: field.compulsory,
          fileName: resArray[i]?.data?.original_filename || "",
          fileLink: resArray[i]?.data?.secure_url || "",
          fileType: resArray[i]?.data?.secure_url.split(".").pop() || "",
          fileSize: resArray[i]?.data?.bytes || "",
        })),
      ],
    } as TFormQACreate;

    updateRequestQA.mutate(
      { requestFormId: activeForm.id, form: payload },
      {
        onSuccess: (data) => {
          console.log("Updated request document");
          if (QAForms?.length - 1 === activeSubTab) {
            onSubmit && onSubmit();
            return;
          }
          tabsRef.current?.setActiveTab(activeSubTab + 1); //navigate to the next sub tab
          setActiveSubTab(activeSubTab + 1);
        },
      }
    );
  };

  return {
    formInfo,
    submitFormHandler,
    isPending,
    isSuccess,
    QAForms,
    docSubforms,
    docTemplateSubforms,
  };
};
