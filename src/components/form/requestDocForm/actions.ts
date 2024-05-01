import { uploadFileToCloudinary, useGlobalFunctions } from "@/hooks/globalFunctions";
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
import { Dispatch, SetStateAction } from "react";

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
  handeleSubmit,
  setIsUploading,
}: INewFormActionProps) => {
  const updateRequestQA = useUpdateRequestQA();
  const { userCloudFolder } = useGlobalFunctions();

  // Returns the QA for a field
  const getQAField = (question: string) => {
    // const QASubForm = requestFormQA?.subForm;
    const QASubForm = QAForm?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const docSubforms =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return isDoc;
    }) || [];

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
  const submitFormHandler = async (
    values: Record<any, any>
    // reset: UseFormReset<any>
  ) => {
    if (!info) return;
    console.log(values, docSubforms);

    setIsUploading(true);
    const resArray = await Promise.all(
      docSubforms.map(async (el, i: number) => {
        const uploadRes = await uploadFileToCloudinary({
          file: values[sluggify(el.question)],
          folderName: userCloudFolder,
        });
        return uploadRes;
      })
    );
    setIsUploading(false);
    if (!resArray) return;

    const getAnswer = (field: TSubForm) => {
      let answer = values[sluggify(field.question)];
      if (typeof answer === "number") answer = answer.toString();
      return answer;
    };
    console.log(values);

    const payload: TFormQACreate = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: false,
      subForm: info.subForm.map((field, i) => ({
        id: getQAField(field.question)?.id,
        question: field.question,
        answer: getAnswer(field),
        type: field.type,
        compulsory: field.compulsory,
        fileName: resArray[i]?.data?.original_filename || "",
        fileLink: resArray[i]?.data?.secure_url || "",
        fileType: resArray[i]?.data?.secure_url.split(".").pop() || "",
        fileSize: resArray[i]?.data?.bytes || "",
      })),
    } as TFormQACreate;

    console.log(payload);
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
  };
  const isPending = updateRequestQA.isPending;

  return { submitFormHandler, formInfo, isPending };
};

interface INewFormActionProps {
  info: TServiceForm | TProductForm;
  QAForm?: TFormQAGet;
  handeleSubmit: () => void;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
}
