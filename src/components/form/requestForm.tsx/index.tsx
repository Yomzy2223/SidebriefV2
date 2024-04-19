"use client";

import { Button } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions } from "./actions";
import { TSubForm } from "@/services/service/types";

export const RequestForm = ({
  info,
  isLoading,
  isSubmitting,
}: {
  info: TSubForm[];
  isLoading: boolean;
  isSubmitting: boolean;
}) => {
  const { formInfo, submitFormHandler } = useActions({ info });

  return (
    <div className="flex flex-col gap-20 items-stretch">
      <DynamicForm formInfo={formInfo} onFormSubmit={submitFormHandler}>
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
    </div>
  );
};
