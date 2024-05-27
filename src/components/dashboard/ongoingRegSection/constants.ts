import { InfoGif, PaymentCardGif, ProfileGif, ReviewGif } from "@/assets/gif";
import { useGetProductForms } from "@/services/product";
import { useGetRequestQA } from "@/services/productQA";
// import { getRequestQA } from "@/services/productQA/operations";
import { TFormQAGet, TSubformQAGet } from "@/services/productQA/types";
import { TSubForm } from "@/services/service/types";
import { TProductForm } from "@/services/product/types";
import { useGetServiceForms } from "@/services/service";
// import { useUploadActions } from "@/app/(mainpages)/request/[service]/kyc/[processId]/upload/uploadActions";

const noDocuments: (form: TProductForm) => TSubForm[] = (form: TProductForm) => {
  return form.subForm?.filter(
    (subform) => subform.type !== "document upload" && subform.type !== "document template"
  );
};
export const useSteps = ({
  productRequestId,
  serviceId,
  productId,
}: {
  productRequestId: string;
  serviceId: string;
  productId: string;
}) => {
  const getProductQA = useGetRequestQA(productRequestId);

  const productQA = getProductQA.data?.data.data;

  const persons = productQA?.filter((qa) => qa.type === "person");

  const getServiceForm = useGetServiceForms(serviceId);

  const serviceForm = getServiceForm.data?.data.data;

  const getProductForm = useGetProductForms(productId);

  const productForms = getProductForm.data?.data.data;

  // const { checkAllUploaded } = useUploadActions({
  //   persons: persons || [],
  //   forms: productForms || [],
  // });

  // console.log(productForms);

  type booleanFunc = () => boolean;

  const checkStepInfo: booleanFunc = () => {
    // if prroductQA is empty or undefinedr
    if (!productQA || productQA.length === 0) {
      return false;
    }

    // Check if each form has been answered
    for (const form of serviceForm || []) {
      const formAnswers = productQA.find((answer) => answer.formId === form.id);
      if (!formAnswers) {
        return false;
      }

      // Check if each subForm in the form has been answered
      for (const subForm of form.subForm) {
        const subFormAnswer = formAnswers.subForm.find(
          (subAnswer) => subAnswer.question === subForm.question
        );
        if (!subFormAnswer || subFormAnswer.answer.length === 0) {
          // If a subForm does not have an answer or the answer is empty, return false
          return false;
        }
      }
    }

    // If all forms and subForms have been answered, return true
    return true;
  };

  const checkStepKYC: booleanFunc = () => {
    // if prroductQA is empty or undefined
    if (!productQA || productQA.length === 0) {
      return false;
    }

    // check the no documents part first
    const noDocumentForms: TProductForm[] =
      productForms
        ?.filter((form) => form.type !== "person")
        ?.map((form) => ({
          ...form,
          productSubForm: noDocuments(form),
        })) ?? [];

    for (const form of noDocumentForms || []) {
      const formAnswers = productQA.find((answer) => answer.formId === form.id);
      if (!formAnswers) {
        // If a form does not have an answer, return false
        return false;
      }

      // Check if each subForm in the form has been answered
      for (const subForm of form.subForm) {
        const subFormAnswer = formAnswers.subForm.find((subAnswer) => subAnswer.id === subForm.id);
        if (!subFormAnswer || subFormAnswer.answer.length === 0) {
          // If a subForm does not have an answer or the answer is empty, return false
          return false;
        }
      }
    }

    // if (!checkAllUploaded(productQA)) {
    //   return false;
    // }

    return true;
  };

  // console.log(checkStep4());

  return {
    loading: getServiceForm.isLoading || getProductQA.isLoading,
    steps: [
      {
        step: "Step 1",
        description: "Browse our services and select the one that best suits your business needs.",
        // state: "request-info",
        icon: ProfileGif,
        done: true,
      },
      {
        step: "Step 2",
        description: "Answer a few quick questions to personalize your request process.",
        // TODO: check if payment is done
        done: false,
        icon: InfoGif,
      },
      {
        step: "Step 3",
        description: "Complete your request with a secure and convenient payment method.",
        done: checkStepInfo(),
        icon: PaymentCardGif,
      },
      {
        step: "Step 4",
        description: "Submit all required information and documents to complete your registration.",
        done: checkStepKYC(),
        icon: ReviewGif,
      },
    ],
  };
};
