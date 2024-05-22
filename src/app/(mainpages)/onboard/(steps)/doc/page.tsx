"use client";

import React from "react";
import DynamicForm from "@/components/form/dynamicForm";
import { useCountryApi } from "@/hooks/useCountryApi";
// import { CountryTypes } from "@/types/type";
import { Button } from "flowbite-react";
import { Oval } from "react-loading-icons";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import * as z from "zod";
import { IFormInput } from "@/components/form/constants";
import { useRouter } from "next/navigation";

const OnboardDoc = () => {
  const handleSubmit = () => {};

  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className="px-12">
      <div className="flex flex-col mb-8">
        <h4 className="text-sm leading-normal text-foreground-3 mb-1">
          Upload documents (Optional)
        </h4>
        <h6 className="text-2xl leading-normal font-semibold text-primary">
          Upload documents as appropriate, please note each field title
        </h6>
      </div>

      <div>
        <DynamicForm formInfo={formInfo} onFormSubmit={handleSubmit} defaultValues={defaultValues}>
          <div className="flex justify-between mt-7 md:mt-9">
            <Button
              color="plain"
              size="fit"
              className="text-destructive-foreground"
              onClick={goBack}
            >
              <div className="space-x-2 flex items-center">
                <p>Go Back</p>
                {true && <ArrowRightCircle className="ml-1" />}
              </div>
            </Button>

            <Button
              color="secondary"
              size={"lg"}
              type="submit"
              isProcessing={false}
              disabled={false}
              processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
            >
              <div className="space-x-2 flex items-center">
                <p>Onboard Business</p>
                {true && <ArrowRightCircle className="ml-1" />}
              </div>
            </Button>
          </div>
        </DynamicForm>
      </div>
    </div>
  );
};

export default OnboardDoc;

const formInfo: IFormInput[] = [
  {
    name: "certificate",
    label: "Certificate of Incorporation",
    type: "document template",
    textInputProp: {
      placeholder: "Enter your full name here",
    },
  },
  {
    name: "tax",
    label: "Tax Registration document",
    type: "document upload",
    textInputProp: {
      placeholder: "Enter your email here",
    },
  },
];

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter your name" }),
  email: z.string().min(1, { message: "Enter your email" }),
  number: z.string().min(1, { message: "Enter your number" }),
});

type signUpType = z.infer<typeof formSchema>;

const defaultValues = {
  name: "",
  emai: "",
  number: "",
};
