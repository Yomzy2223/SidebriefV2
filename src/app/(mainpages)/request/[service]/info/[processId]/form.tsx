"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button, TabsRef } from "@/components/flowbite";
import { ArrowRight, CogOutline } from "@/assets/icons";
import { useGetServiceFormSubForms } from "@/services/service";
import { LoadingSkeleton } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProductQA } from "@/services/product";
import { useGetCountries } from "@/services/service";
import { isFileType, useActions, useRemember } from "./actions";
import { MutableRefObject, useEffect, useState } from "react";
import DynamicForm from "@/components/form/dynamicForm";
import { sluggify } from "@/lib/utils";
import { IForm } from "@/services/service/types";
import { useRouter, useParams } from "next/navigation";

export const LaunchForm1 = ({
  form,
  urlProductId,
  tabsRef,
  currentTab = 0,
  totalNumOfTabs = 1,
}: {
  // subForms: ISubForm[];
  // serviceFormId: string;
  urlProductId: string;
  form: IForm;
  tabsRef?: MutableRefObject<any>;
  currentTab?: number;
  totalNumOfTabs?: number;
}) => {
  // const createProduct = useCreateNewProduct();

  const router = useRouter();

  const params: { service: string; processId: string } = useParams();

  const subForms = form.subForm;

  const { saveFormProductQA, savingForm, updateFormProductQA, updatingForm } = useActions({
    form,
  });

  const { values, isLoading, formState } = useRemember({ productId: urlProductId, form: form });

  const submitFormHandler = async (values: { [x: string]: string | string[] }) => {
    if (!formState) {
      await saveFormProductQA({
        productId: urlProductId,
        values,
        isGeneral: true,
      });
    } else {
      await updateFormProductQA({
        requestFormState: !Array.isArray(formState) ? formState : undefined,
        values: values,
        isGeneral: true,
      });
    }

    if (tabsRef && currentTab !== totalNumOfTabs - 1) {
      tabsRef.current.setActiveTab(currentTab + 1);
    }
    if (currentTab === totalNumOfTabs - 1) {
      router.push(`/request/${params.service}/kyc/${params.processId}`);
    }
  };

  return (
    <div
      // onSubmit={form.handleSubmit(submitFormHandler)}
      className="flex flex-col gap-20 items-stretch"
    >
      {isLoading ? (
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
                const value = values[sluggify(input.question)];
                const rValue = !isFileType(value) ? value : "";
                return {
                  name: sluggify(input.question),
                  type: input.type,
                  id: input.id,
                  label: input.question,
                  selectOptions: input.options,
                  value: rValue,
                };
              })!
            }
            onFormSubmit={submitFormHandler}
          >
            <Button
              color="secondary"
              size={"lg"}
              type="submit"
              isProcessing={savingForm || updatingForm}
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
