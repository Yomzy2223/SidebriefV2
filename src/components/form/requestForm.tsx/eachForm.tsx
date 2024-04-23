"use client";

import { Button } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions } from "./actions";
import { TProductForm, TServiceForm } from "@/services/service/types";

const EachForm = ({
  info,
  isLoading,
  isServiceForm = false,
  onSubmit,
}: {
  info: TServiceForm | TProductForm;
  isLoading: boolean;
  isServiceForm?: boolean;
  onSubmit: () => void;
}) => {
  const { formInfo, submitFormHandler, isPending } = useActions({
    info,
    isServiceForm,
    onSubmit,
  });

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
        isProcessing={isPending}
        disabled={isPending}
        processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
      >
        <div className="space-x-2 flex items-center">
          <p>Continue</p>
          {!isPending && <ArrowRightCircle className="ml-1" />}
        </div>
      </Button>
    </DynamicForm>
  );
};

export default EachForm;
