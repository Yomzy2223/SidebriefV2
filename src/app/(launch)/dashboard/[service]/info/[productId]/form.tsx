"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, TabsRef } from "@/components/flowbite";
import { ArrowRight, CogOutline } from "@/assets/icons";
import { useGetServiceFormSubForms } from "@/services/service";
import { LoadingSkeleton } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewProduct, useGetProductQA } from "@/services/product";
import { useGetCountries } from "@/services/service";
import { useActions } from "./actions";
import { MutableRefObject, useEffect, useState } from "react";
import DynamicForm from "@/components/form/dynamicForm";
import slugify from "slugify";
import { serviceFormType } from "@/services/service/types";

export const LaunchForm1 = ({
  form,
  urlProductId,
  tabsRef,
  currentTab = 0,
  totalNumOfTabs = 1,
}: {
  // subForms: serviceFormSubFormType[];
  // serviceFormId: string;
  urlProductId: string;
  form: serviceFormType;
  tabsRef?: MutableRefObject<any>;
  currentTab?: number;
  totalNumOfTabs?: number;
}) => {
  const createProduct = useCreateNewProduct();

  const [formset, setFormset] = useState(false);

  const [values, setValues] = useState<{ [key: string]: string | string[] }>({});

  const productQA = useGetProductQA(urlProductId);

  const prevFormstates = productQA.data?.data.data.filter((el) => el.title === form.title);

  const subForms = form.subForm;

  const { saveFormProductQA, savingForm } = useActions({
    form,
  });

  // console.log(subForms);

  useEffect(() => {
    if (urlProductId && !productQA.isLoading && prevFormstates && !formset) {
      const latestProductState = prevFormstates[prevFormstates?.length - 1];
      if (latestProductState === undefined) {
        return;
      }
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
  }, [urlProductId, productQA, formset, form.title, prevFormstates]);

  const submitFormHandler = async (values: { [x: string]: string | string[] }) => {
    await saveFormProductQA(urlProductId, values, true);
    if (tabsRef && currentTab !== totalNumOfTabs - 1) {
      tabsRef.current.setActiveTab(currentTab + 1);
    }
    if (currentTab === totalNumOfTabs - 1) {
      // check for form completion then proceed or proceed
    }
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
