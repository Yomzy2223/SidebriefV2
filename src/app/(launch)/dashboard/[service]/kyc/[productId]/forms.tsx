"use client";

import { Button, Tabs } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { productFormType } from "@/services/product/types";

export const Forms = ({ forms }: { forms: productFormType[] }) => {
  const submitform = (values: { [key: string]: string }) => {
    console.log(values);
  };

  return (
    <Tabs aria-label="Form tabs" style="underline">
      {forms.map((form) => (
        <Tabs.Item active title={form.title} key={form.id}>
          <DynamicForm
            formInfo={form.productSubForm.map((subform) => ({
              name: subform.question,
              type: subform.type,
              selectOptions: subform.options,
            }))}
            onFormSubmit={submitform}
          >
            <Button color="primary">Submit</Button>
          </DynamicForm>
        </Tabs.Item>
      ))}
    </Tabs>
  );
};
