import { z } from "zod";
import { ISubForm, IForm } from "@/services/service/types";
import { useDeleteRequestQA, useSaveRequestQA, useUpdateRequestQA } from "@/services/productQA";
import { FileType, FormItem, IFormQA } from "@/services/productQA/types";
import { useRouter, useParams } from "next/navigation";
import { sluggify } from "@/lib/utils";
import { IForm } from "@/services/productQA/types";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useGetRequestQA } from "@/services/productQA";
import { useState } from "react";

// typescript type guard
function isServiceFormType(form: any): form is IForm {
  return "serviceId" in form;
}

export function isFileType(obj: any): obj is FileType {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "size" in obj &&
    (typeof obj.size === "string" || obj.size === undefined) &&
    "link" in obj &&
    typeof obj.link === "string" &&
    "type" in obj &&
    typeof obj.type === "string"
  );
}

export const useActions = ({ form }: { form: IForm | IForm }) => {
  const saveRequestQA = useSaveRequestQA();
  const updateRequestQA = useUpdateRequestQA();
  const deleteRequestQA = useDeleteRequestQA();

  const saveFormProductQA = async ({
    productId,
    values,
    isGeneral,
    fileDescription,
  }: {
    productId: string;
    values: { [x: string]: string | string[] | FileType };
    isGeneral?: boolean;
    fileDescription?: string;
  }) => {
    const formQA: FormItem[] = Object.keys(values).map((slug) => {
      const subForm = isServiceFormType(form)
        ? form.subForm?.find((el) => sluggify(el.question) === slug)
        : form.productSubForm?.find((el) => sluggify(el.question) === slug);

      return {
        question: subForm?.question,
        answer: isFileType(values[slug])
          ? [""]
          : Array.isArray(values[slug])
          ? values[slug]
          : [values[slug]],
        compulsory: subForm?.compulsory,
        isGeneral: true,
        type: subForm?.type,
        file: isFileType(values[slug]) && values[slug],
      } as FormItem;
    });

    // save the answers
    return saveRequestQA.mutateAsync(
      {
        productId,
        form: {
          title: fileDescription ? "document upload" : form.title,
          description: fileDescription ? fileDescription : form.description,
          type: form.type,
          compulsory: form.compulsory,
          isGeneral: isGeneral || false,
          subForm: formQA,
        },
      },
      {
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const updateFormProductQA = async ({
    values,
    isGeneral,
    requestFormState,
    fileDescription,
  }: {
    values: { [x: string]: string | string[] | FileType };
    isGeneral?: boolean;
    requestFormState: IFormQA | undefined;
    fileDescription?: string;
  }) => {
    if (!requestFormState) return;

    const formQA: FormItem[] = Object.keys(values).map((slug) => {
      let subForm = requestFormState.subForm?.find((el) => sluggify(el.question) === slug);

      // if (form.title === "document upload") {
      //   subForm = productQA.data?.data.data.filter(
      //     (el) => el.description === form.description && form.title === "document upload"
      //   );
      // }

      const formItem = {
        id: subForm?.id,
        question: subForm?.question,
        answer: isFileType(values[slug])
          ? [""]
          : Array.isArray(values[slug])
          ? values[slug]
          : [values[slug]],
        compulsory: subForm?.compulsory,
        isGeneral: true,
        type: subForm?.type,
        file: isFileType(values[slug]) && values[slug],
      } as FormItem;

      return formItem;
      // }
    });

    return updateRequestQA.mutateAsync({
      requestFormId: requestFormState.id,
      form: {
        title: fileDescription ? "document upload" : form.title,
        description: fileDescription ? fileDescription : form.description,
        type: form.type,
        compulsory: form.compulsory,
        isGeneral: isGeneral || false,
        subForm: formQA,
      },
    });
  };

  const deleteFormProductQA = async ({
    requestFormState,
  }: {
    requestFormState: IFormQA | undefined;
  }) => {
    if (!requestFormState) return;

    return deleteRequestQA.mutateAsync({ requestFormId: requestFormState?.id });
  };

  return {
    saveFormProductQA,
    savingForm: saveRequestQA.isPending,
    updateFormProductQA,
    updatingForm: updateRequestQA.isPending,
    deleteFormProductQA,
    deletingForm: deleteRequestQA.isPending,
  };
};

const stringValues = ["country", "address", "email address", "short answer", "countries-all"];
const documentValues = ["document upload"];

export const useRemember = ({
  productId,
  form,
  selectedPerson,
}: {
  productId: string;
  form: IForm | IForm;
  selectedPerson?: number | null;
}) => {
  const productQA = useGetRequestQA(productId);

  let prevFormstates = productQA.data?.data.data.filter((el) => el.title === form.title);

  if (form.title === "document upload") {
    prevFormstates = productQA.data?.data.data.filter(
      (el) => el.description === form.description && form.title === "document upload"
    );
  }

  const [values, setValues] = useState<{ [key: string]: string | string[] | FileType }>({});

  const valueSetter = useCallback(
    ({ latestProductState, reset }: { latestProductState?: IFormQA; reset: boolean }) => {
      const newValues: { [key: string]: string | string[] | FileType } = {};

      latestProductState?.subForm.forEach((qa) => {
        if (stringValues.includes(qa.type)) {
          // set fields with string values
          newValues[sluggify(qa.question || "")] = reset ? "" : qa.answer[0];
        } else if (documentValues.includes(qa.type)) {
          // set fields with document values
          newValues[sluggify(qa.question || "")] = reset
            ? ""
            : ({
                link: qa.fileLink,
                name: qa.fileName,
                type: qa.fileType,
                size: "size",
              } as FileType);
        } else {
          // set fields with array values
          newValues[sluggify(qa.question || "")] = reset ? [] : qa.answer;
        }
      });

      // prevent unnecesssary rerenders
      if (JSON.stringify(newValues) !== JSON.stringify(values)) {
        setValues(newValues);
      }
    },
    [values]
  );

  useEffect(() => {
    if (productId && !productQA.isLoading && prevFormstates) {
      if (!prevFormstates || prevFormstates.length === 0) {
        if (JSON.stringify({}) !== JSON.stringify(values)) {
          setValues({});
        }
      } else {
        const latestProductState = !selectedPerson
          ? prevFormstates[0]
          : prevFormstates[selectedPerson - 1];

        // const latestProductState = prevFormstates[0];

        // if (latestProductState === undefined) {
        //   return;
        // }

        let reset = false;

        if (!selectedPerson && form.type === "person") {
          reset = true;
        }

        valueSetter({ latestProductState, reset });
      }
    }
  }, [
    productId,
    productQA.isLoading,
    values,
    prevFormstates,
    selectedPerson,
    form.type,
    valueSetter,
  ]);

  const getFormState = () => {
    if (!prevFormstates || prevFormstates.length === 0) {
      return null;
    } else if (form.type === "person") {
      return prevFormstates;
    } else if (selectedPerson) {
      return prevFormstates[selectedPerson - 1];
    } else {
      return prevFormstates[0];
    }
  };

  return {
    formState: getFormState(),
    values,
    isLoading: productQA.isPending,
    refetchState: productQA.refetch,
  };
};