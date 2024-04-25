"use client";

import { Button } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions } from "./actions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [onlyCreate, setOnlyCreate] = useState(false);

  const formRef = useRef<HTMLFormElement>();

  const { formInfo, submitFormHandler, isPending, isSuccess } = useActions({
    info,
    isServiceForm,
    setOnlyCreate,
    onSubmit,
  });

  return (
    <DynamicForm
      formInfo={formInfo}
      onFormSubmit={({ values, reset }) => submitFormHandler(values, reset, onlyCreate)}
      className="gap-6"
      formClassName="gap-12 justify-between"
    >
      <div className="flex justify-between gap-6">
        <Button
          color="secondary"
          size="lg"
          type="submit"
          isProcessing={isPending && !onlyCreate}
          disabled={isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          <div className="space-x-2 flex items-center">
            <p>Continue</p>
            {!isPending && <ArrowRightCircle className="ml-1" />}
          </div>
        </Button>
        {info?.type === "person" && (
          <Button
            type="submit"
            color="transparent"
            size="fit"
            className="text-primary"
            disabled={isPending}
            onClick={() => setOnlyCreate(true)}
          >
            {`Add new ${info.title}`}
          </Button>
        )}
      </div>
    </DynamicForm>
  );
};

export default EachForm;
