"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { productFormType, productSubFormType } from "@/services/product/types";
import { sluggify } from "@/lib/utils";
import { ArrowRight } from "@/assets/icons";
import { useRef, useState } from "react";
import { useActions } from "../../info/[productId]/actions";
import { useParams } from "next/navigation";

export const Forms = ({ forms }: { forms: productFormType[] }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  const params: { service: string; productId: string } = useParams();

  const { saveFormProductQA, savingForm } = useActions({ form: forms[activeTab] });

  const submitform = async (values: { [key: string]: string }) => {
    await saveFormProductQA(params.productId, values, false);
    if (tabsRef && activeTab !== forms.length - 1) {
      tabsRef.current?.setActiveTab(activeTab + 1);
    }
  };

  const noDocuments: (form: productFormType) => productSubFormType[] = (form: productFormType) => {
    return form.productSubForm.filter((subform) => subform.type !== "document upload");
  };

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
                  selectOptions: subform.options,
                  label: subform.question,
                }))}
                onFormSubmit={submitform}
              >
                <Button
                  color="secondary"
                  size={"lg"}
                  type="submit"
                  isProcessing={savingForm}
                  // disabled={isLoading}
                >
                  <div className="space-x-2 flex items-center">
                    <p>Continue</p>
                    <ArrowRight />
                  </div>
                </Button>
              </DynamicForm>
            )}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
};
