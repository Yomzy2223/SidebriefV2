import { z } from "zod";
import { serviceFormSubFormType, serviceFormType } from "@/services/service/types";
import { useDeleteProductQA, useSaveProductQA, useUpdateProductQA } from "@/services/product";
import { FileType, FormItem, productQAType } from "@/services/product/types";
import { useRouter, useParams } from "next/navigation";
import { sluggify } from "@/lib/utils";
import { productFormType } from "@/services/product/types";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useGetProductQA } from "@/services/product";
import { useState } from "react";

// typescript type guard
function isServiceFormType(form: any): form is serviceFormType {
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

export const useActions = ({ form }: { form: serviceFormType | productFormType }) => {
  const saveProductQA = useSaveProductQA();
  const updateProductQA = useUpdateProductQA();
  const deleteProductQA = useDeleteProductQA();

  console.log(form);

  const saveFormProductQA = async ({
    productId,
    values,
    isGeneral,
  }: {
    productId: string;
    values: { [x: string]: string | string[] | FileType };
    isGeneral?: boolean;
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
    return saveProductQA.mutateAsync(
      {
        productId,
        form: {
          title: form.title,
          description: form.description,
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
  }: {
    values: { [x: string]: string | string[] | FileType };
    isGeneral?: boolean;
    requestFormState: productQAType | undefined;
  }) => {
    if (!requestFormState) return;

    console.log(values);

    console.log(form);

    const formQA: FormItem[] = Object.keys(values).map((slug) => {
      const subForm = requestFormState.subForm?.find((el) => sluggify(el.question) === slug);

      // const formItem = {
      //   id: subForm?.id,
      //   question: subForm?.question,
      //   answer: Array.isArray(values[slug]) ? values[slug] : [values[slug]],
      //   compulsory: subForm?.compulsory,
      //   isGeneral: true,
      //   type: subForm?.type,
      //   // file: isFileType(values[slug]) && values[slug],
      // } as FormItem;

      // if (!subForm) {
      //   const pureSubForm = isServiceFormType(form)
      //     ? form.subForm?.find((el) => sluggify(el.question) === slug)
      //     : form.productSubForm?.find((el) => sluggify(el.question) === slug);

      //   console.log("got here", pureSubForm);
      //   console.log({
      //     id: pureSubForm?.id,
      //     question: pureSubForm?.question,
      //     answer: isFileType(values[slug])
      //       ? [""]
      //       : Array.isArray(values[slug])
      //       ? values[slug]
      //       : [values[slug]],
      //     compulsory: pureSubForm?.compulsory,
      //     isGeneral: true,
      //     type: pureSubForm?.type,
      //     file: isFileType(values[slug]) && values[slug],
      //   });
      //   return {
      //     id: pureSubForm?.id,
      //     question: pureSubForm?.question,
      //     answer: isFileType(values[slug])
      //       ? [""]
      //       : Array.isArray(values[slug])
      //       ? values[slug]
      //       : [values[slug]],
      //     compulsory: pureSubForm?.compulsory,
      //     isGeneral: true,
      //     type: pureSubForm?.type,
      //     file: isFileType(values[slug]) && values[slug],
      //   } as FormItem;
      // } else {
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

    return updateProductQA.mutateAsync({
      requestFormId: requestFormState.id,
      form: {
        title: form.title,
        description: form.description,
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
    requestFormState: productQAType | undefined;
  }) => {
    if (!requestFormState) return;

    return deleteProductQA.mutateAsync({ requestFormId: requestFormState?.id });
  };

  return {
    saveFormProductQA,
    savingForm: saveProductQA.isPending,
    updateFormProductQA,
    updatingForm: updateProductQA.isPending,
    deleteFormProductQA,
    deletingForm: deleteProductQA.isPending,
  };
};

export const useRemember = ({
  productId,
  form,
  selectedPerson,
}: {
  productId: string;
  form: serviceFormType | productFormType;
  selectedPerson?: number | null;
}) => {
  const productQA = useGetProductQA(productId);

  const prevFormstates = productQA.data?.data.data.filter((el) => el.title === form.title);

  const [values, setValues] = useState<{ [key: string]: string | string[] | FileType }>({});

  const valueSetter = useCallback(
    ({ latestProductState, reset }: { latestProductState?: productQAType; reset: boolean }) => {
      const newValues: { [key: string]: string | string[] | FileType } = {};

      latestProductState?.subForm.forEach((qa) => {
        switch (qa.type) {
          case "country":
          case "address":
          case "email address":
          case "short answer":
            newValues[sluggify(qa.question || "")] = reset ? "" : qa.answer[0];
            break;
          // the document cases
          case "document upload":
            newValues[sluggify(qa.question || "")] = reset
              ? ""
              : ({ link: qa.fileLink, name: qa.fileName, type: qa.fileType } as FileType);
            break;
          default:
            newValues[sluggify(qa.question || "")] = reset ? [] : qa.answer;
        }
      });

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
          ? prevFormstates[prevFormstates?.length - 1]
          : prevFormstates[selectedPerson - 1];

        if (latestProductState === undefined) {
          return;
        }

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

  let formState: productQAType | productQAType[] | null;

  if (!prevFormstates || prevFormstates.length === 0) {
    formState = null;
  } else if (form.type === "person") {
    formState = prevFormstates;
  } else if (selectedPerson) {
    formState = prevFormstates[selectedPerson - 1];
  } else {
    formState = prevFormstates[prevFormstates?.length - 1];
  }

  return {
    formState,
    values,
    isLoading: productQA.isPending,
    refetchState: productQA.refetch,
  };
};
