import { z } from "zod";
import { serviceFormSubFormType, serviceFormType } from "@/services/service/types";
import { useSaveProductQA, useUpdateProductQA } from "@/services/product";
import { FormItem, productQAType } from "@/services/product/types";
import { useRouter, useParams } from "next/navigation";
import { sluggify } from "@/lib/utils";
import { productFormType } from "@/services/product/types";
import { MutableRefObject, useEffect, useRef } from "react";
import { useGetProductQA } from "@/services/product";
import { useState } from "react";

// typescript type guard
function isServiceFormType(form: any): form is serviceFormType {
  return "serviceId" in form;
}

export const useActions = ({ form }: { form: serviceFormType | productFormType }) => {
  const saveProductQA = useSaveProductQA();
  const updateProductQA = useUpdateProductQA();

  const saveFormProductQA = async ({
    productId,
    values,
    isGeneral,
  }: {
    productId: string;
    values: { [x: string]: string | string[] };
    isGeneral?: boolean;
  }) => {
    const formQA: FormItem[] = Object.keys(values).map((slug) => {
      const subForm = isServiceFormType(form)
        ? form.subForm?.find((el) => sluggify(el.question) === slug)
        : form.productSubForm?.find((el) => sluggify(el.question) === slug);

      return {
        question: subForm?.question,
        answer: Array.isArray(values[slug]) ? values[slug] : [values[slug]],
        compulsory: subForm?.compulsory,
        isGeneral: true,
        type: subForm?.type,
      } as FormItem;
    });

    console.log("saving");

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
    values: { [x: string]: string | string[] };
    isGeneral?: boolean;
    requestFormState: productQAType | undefined;
  }) => {
    if (!requestFormState) return;

    const formQA: FormItem[] = Object.keys(values).map((slug) => {
      const subForm = requestFormState.subForm?.find((el) => sluggify(el.question) === slug);

      return {
        id: subForm?.id,
        question: subForm?.question,
        answer: Array.isArray(values[slug]) ? values[slug] : [values[slug]],
        compulsory: subForm?.compulsory,
        isGeneral: true,
        type: subForm?.type,
      } as FormItem;
    });

    console.log("updating");

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
  return {
    saveFormProductQA,
    savingForm: saveProductQA.isPending,
    updateFormProductQA,
    updatingForm: updateProductQA.isPending,
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

  const [values, setValues] = useState<{ [key: string]: string | string[] }>({});

  // const formState = useRef<productQAType | productQAType[] | null>(null);
  const [formState, setFormState] = useState<productQAType | productQAType[] | null>(null);

  useEffect(() => {
    if (productId && !productQA.isLoading && prevFormstates) {
      if (!prevFormstates || prevFormstates.length === 0) {
        setFormState(null);
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
          return;
        }

        // formState.current = form.type === "person" ? prevFormstates : latestProductState;
        const newFormState = form.type === "person" ? prevFormstates : latestProductState;

        if (JSON.stringify(newFormState) !== JSON.stringify(formState)) {
          setFormState(newFormState);
        }

        const newValues: { [key: string]: string | string[] } = {};

        latestProductState.subForm.forEach((qa) => {
          switch (qa.type) {
            case "country":
            case "address":
            case "email address":
            case "short answer":
              newValues[sluggify(qa.question || "")] = reset ? [] : qa.answer[0];
              break;
            default:
              newValues[sluggify(qa.question || "")] = reset ? "" : qa.answer;
          }
        });

        if (JSON.stringify(newValues) !== JSON.stringify(values)) {
          setValues(newValues);
        }
      }
    }
  }, [
    productId,
    productQA.isLoading,
    values,
    prevFormstates,
    formState,
    selectedPerson,
    form.type,
  ]);

  return {
    formState,
    values,
    isLoading: productQA.isPending,
    refetchState: productQA.refetch,
  };
};
