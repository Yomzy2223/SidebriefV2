"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/flowbite";
import { ArrowRight, CogOutline } from "@/assets/icons";
import { useGetServiceFormSubForms } from "@/services/service";
import { LoadingSkeleton } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewProduct, useGetProductQA } from "@/services/product";
import { useGetCountries } from "@/services/service";
import { useActions } from "./actions";
import { useEffect, useState } from "react";
import DynamicForm from "@/components/form/dynamicForm";
import slugify from "slugify";
import { serviceFormType } from "@/services/service/types";

export const LaunchForm1 = ({
  form,
  urlProductId,
}: {
  // subForms: serviceFormSubFormType[];
  // serviceFormId: string;
  urlProductId: string;
  form: serviceFormType;
}) => {
  const createProduct = useCreateNewProduct();

  const [formset, setFormset] = useState(false);

  const [values, setValues] = useState<{ [key: string]: string | string[] }>({});

  const productQA = useGetProductQA(urlProductId);

  const latestProductState = productQA.data?.data.data[productQA.data?.data.data.length - 1];

  const subForms = form.subForm;

  const { saveFormProductQA, savingForm } = useActions({
    form,
  });

  // console.log(subForms);

  useEffect(() => {
    if (urlProductId && !productQA.isLoading && latestProductState && !formset) {
      latestProductState.subForm.forEach((qa) => {
        switch (qa.type) {
          case "country":
            setValues((prev) => ({
              ...prev,
              [slugify(qa.question)]: qa.answer[0],
            }));
            break;
          default:
            setValues((prev) => ({
              ...prev,
              [slugify(qa.question)]: qa.answer,
            }));
        }
      });
      setFormset(true);
    }
  }, [urlProductId, productQA, formset, latestProductState]);

  const submitFormHandler = async (values: { [x: string]: string | string[] }) => {
    await saveFormProductQA(urlProductId, values, true);
  };

  return (
    <div
      // onSubmit={form.handleSubmit(submitFormHandler)}
      className="flex flex-col gap-20 items-stretch"
    >
      {productQA.isLoading ? (
        <>
          {[1, 2, 3]?.map((number) => (
            <LoadingSkeleton key={number} />
          ))}
        </>
      ) : (
        <>
          <DynamicForm
            formInfo={
              subForms?.map((input) => {
                return {
                  name: slugify(input.question),
                  type: input.type,
                  id: input.id,
                  label: input.question,
                  selectOptions: input.options,
                  value: values[slugify(input.question)],
                };
              })!
            }
            onFormSubmit={submitFormHandler}
          >
            <Button
              color="secondary"
              size={"lg"}
              type="submit"
              isProcessing={createProduct.isPending || savingForm}
              // disabled={isLoading}
            >
              <div className="space-x-2 flex items-center">
                <p>Continue</p>
                <ArrowRight />
              </div>
            </Button>
          </DynamicForm>
        </>
      )}
      {/* <Button
				color="secondary"
				size={"lg"}
				type="submit"
				isProcessing={createProduct.isPending || savingForm}
				disabled={isLoading}
			>
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button> */}
    </div>
  );
};
