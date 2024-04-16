"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { productFormType, productSubFormType } from "@/services/product/types";
import { sluggify } from "@/lib/utils";
import { ArrowRight } from "@/assets/icons";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useActions, useRemember } from "../../info/[productId]/actions";
import { useParams } from "next/navigation";

export const Forms = ({ forms }: { forms: productFormType[] }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  const params: { service: string; productId: string } = useParams();

  const { saveFormProductQA, savingForm } = useActions({ form: forms[activeTab] });

  const submitform = async (values: { [key: string]: string | string[] }, isAdd?: boolean) => {
    // await saveFormProductQA(params.productId, values, false);
    // if (tabsRef && activeTab !== forms.length - 1 && !isAdd) {
    //   tabsRef.current?.setActiveTab(activeTab + 1);
    // }
    if (isAdd) {
      console.log(forms[activeTab]);
    }
  };

  const noDocuments: (form: productFormType) => productSubFormType[] = (form: productFormType) => {
    return form.productSubForm.filter((subform) => subform.type !== "document upload");
  };

  const [formState, setFormState] = useState<any>(null);

  const handleFormStateChange = useCallback((values: any) => {
    setFormState(values);
  }, []);

  const { values, isLoading } = useRemember({
    productId: params.productId,
    form: forms[activeTab],
  });

  return (
    <Tabs
      aria-label="Form tabs"
      style="underline"
      ref={tabsRef}
      onActiveTabChange={(tab) => setActiveTab(tab)}
    >
      {forms.map((form) => {
        return (
          <Tabs.Item active title={form.title} key={form.id}>
            {noDocuments(form).length <= 0 ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submitform({});
                }}
                className="space-y-8"
              >
                <p>Proceed to the next tab</p>
                <Button
                  color="secondary"
                  size={"lg"}
                  type="submit"
                  // isProcessing={savingForm}
                  // disabled={isLoading}
                >
                  <div className="space-x-2 flex items-center">
                    <p>Continue</p>
                    <ArrowRight />
                  </div>
                </Button>
              </form>
            ) : (
              <DynamicForm
                formInfo={noDocuments(form).map((subform) => ({
                  name: sluggify(subform.question),
                  type: subform.type,
                  id: subform.id,
                  label: subform.question,
                  selectOptions: subform.options,
                  value: values[sluggify(subform.question)],
                }))}
                onFormSubmit={submitform}
                watchValues={handleFormStateChange}
              >
                <div className="flex justify-between">
                  <div className="flex space-x-[18px]">
                    <Button
                      color="secondary"
                      size={"lg"}
                      type="submit"
                      isProcessing={savingForm}
                      disabled={isLoading}
                    >
                      <div className="space-x-2 flex items-center">
                        <p>Continue</p>
                        <ArrowRight />
                      </div>
                    </Button>
                    {/* <Button
                      color="primary"
                      size={"lg"}
                      type="button"
                      outline
                      // isProcessing={savingForm}
                      // disabled={isLoading}
                    >
                      <div className="space-x-2 flex items-center">
                        <p className="text-primary">Upload documents</p>
                      </div>
                    </Button> */}
                  </div>
                  {form.type === "person" && (
                    <Button
                      color="ghost2"
                      size={"lg"}
                      type="button"
                      isProcessing={savingForm}
                      disabled={isLoading}
                      onClick={() => submitform(formState, true)}
                    >
                      <div className="space-x-2 flex items-center">
                        <p className="text-primary">Add new {form.title.toLowerCase()}</p>
                      </div>
                    </Button>
                  )}
                </div>
              </DynamicForm>
            )}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
};
