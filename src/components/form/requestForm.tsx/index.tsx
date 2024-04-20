"use client";

import { Button } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions } from "./actions";
import { TProductForm, TServiceForm, TSubForm } from "@/services/service/types";

export const RequestForm = ({
  info,
  isLoading,
  isServiceForm = false,
}: {
  info: TServiceForm | TProductForm;
  isLoading: boolean;
  isServiceForm?: boolean;
}) => {
  const { formInfo, submitFormHandler, saveProductQA } = useActions({ info, isServiceForm });

  const isSubmitting = saveProductQA.isPending;
  return (
    <DynamicForm
      formInfo={formInfo}
      onFormSubmit={submitFormHandler}
      className="gap-6"
      formClassName="gap-12 justify-between"
    >
      <Button
        color="secondary"
        size={"lg"}
        type="submit"
        isProcessing={isSubmitting}
        disabled={isSubmitting}
        processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
      >
        <div className="space-x-2 flex items-center">
          <p>Continue</p>
          {!isSubmitting && <ArrowRightCircle className="ml-1" />}
        </div>
      </Button>
    </DynamicForm>
  );
};
