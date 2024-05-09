"use client";

import { IFormInput } from "@/components/form/constants";
import DynamicForm from "@/components/form/dynamicForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { Oval } from "react-loading-icons";
import RequestWrapper from "../wrapper";

const Payment = () => {
  const { setQueriesWithPath } = useGlobalFunctions();
  const { serviceId } = useParams();

  const searchParams = useSearchParams();
  const hasPForms = searchParams.get("hasPForms");

  // Used to create and update QA form
  const submitFormHandler = (values: Record<any, any>) => {
    hasPForms === "true"
      ? setQueriesWithPath({
          path: `/requests/${serviceId}/forms`,
          queries: [{ name: "progress", value: "3" }],
        })
      : setQueriesWithPath({
          path: `/requests/${serviceId}/review`,
          queries: [{ name: "progress", value: "4" }],
        });
  };

  return (
    <RequestWrapper>
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
          isProcessing={false}
          disabled={false}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          <div className="space-x-2 flex items-center">
            <p>Continue</p>
            {true && <ArrowRightCircle className="ml-1" />}
          </div>
        </Button>
      </DynamicForm>
    </RequestWrapper>
  );
};

export default Payment;

const formInfo: IFormInput[] = [
  {
    id: "1",
    name: "name1",
    label: "label1",
    type: "short answer",
    options: [],
    // compulsory: true,
    value: "value1",
  },
  {
    id: "2",
    name: "name2",
    label: "label2",
    type: "short answer",
    options: [],
    // compulsory: true,
    value: "value2",
  },
];
