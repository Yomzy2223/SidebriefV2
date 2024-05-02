import { uploadFileToCloudinary, useGlobalFunctions } from "@/hooks/globalFunctions";
import { sluggify } from "@/lib/utils";
import {
  useDeleteRequestQA,
  useGetRequestFormQA,
  useSaveMultipleQASubForms,
  useSaveRequestQA,
  useUpdateRequestQA,
} from "@/services/productQA";
import { TFormQACreate, TFormQAGet, TSubformQACreate } from "@/services/productQA/types";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export const useActions = ({
  info,
  activeSubTab,
}: {
  info?: TServiceForm | TProductForm;
  activeSubTab: number;
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
  const isOnLastSubTab = activeSubTab === QAForms?.length - 1;

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
  isOnLastSubTab,
}: INewFormActionProps) => {
  const updateRequestQA = useUpdateRequestQA();
  const { userCloudFolder } = useGlobalFunctions();

  // Returns the QA for a field
  const getQAField = (question: string) => {
    const QASubForm = QAForm?.subForm;
    const QAField = QASubForm?.find((el) => el.question === question);
    return QAField;
  };

  const docSubforms =
    info?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return isDoc;
    }) || [];

  const nonDocSubformsQA =
    QAForm?.subForm?.filter((el) => {
      const isDoc = el.type === "document template" || el.type === "document upload";
      return !isDoc;
    }) || [];
  // if (QAForm?.title === "Member") console.log(nonDocSubformsQA);

  // Form info used to construct the form
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
  // if (QAForm?.title === "Member") console.log(formInfo);

  // Used to create and update QA form
  const submitFormHandler = async (
    values: Record<any, any>
    // reset: UseFormReset<any>
  ) => {
    if (!info) return;

    let resArray: any[] = [];

    try {
      setIsUploading(true);
      resArray = await Promise.all(
        docSubforms.map(async (el, i: number) => {
          let file: any = values[sluggify(el.question)];
          let isANewFile: boolean = file instanceof File;

          let response = {
            id: getQAField(el.question)?.id,
            question: el.question,
            answer: [],
            type: el.type,
            compulsory: el.compulsory,
            fileName: "",
            fileLink: "",
            fileType: "",
            fileSize: "",
          };
          if (isANewFile) {
            // If it's a new files, then upload them to cloudinary
            const uploadRes = await uploadFileToCloudinary({
              file: values[sluggify(el.question)],
              folderName: userCloudFolder,
            });
            response.fileName = uploadRes.data?.original_filename;
            response.fileLink = uploadRes.data?.secure_url;
            response.fileType = uploadRes.data?.secure_url.split(".").pop();
            response.fileSize = uploadRes.data?.bytes?.toString();
          } else {
            // If it's not a new file, then set back the old file
            response.fileName = file?.fileName;
            response.fileLink = file?.fileLink;
            response.fileType = file?.fileType;
            response.fileSize = file?.fileSize;
          }

          return response;
        })
      );
      setIsUploading(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }

    const docsAreComplete = resArray?.length === docSubforms?.length;
    const docSubformQA = docsAreComplete ? resArray : docSubforms;

    const payload = {
      title: info.title,
      description: info.description,
      type: info.type,
      compulsory: info.compulsory,
      isGeneral: false,
      subForm: [...nonDocSubformsQA, ...docSubformQA],
    };

    updateRequestQA.mutate(
      { requestFormId: QAForm?.id || "", form: payload },
      {
        onSuccess: (data) => {
          handeleSubmit();
          console.log("Updated request document");
        },
      }
    );
  };
  const isPending = updateRequestQA.isPending;

  return { submitFormHandler, formInfo, isPending };
};

interface INewFormActionProps {
  info: TServiceForm | TProductForm;
  QAForm?: TFormQAGet;
  handeleSubmit: () => void;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  isOnLastSubTab: boolean;
}
