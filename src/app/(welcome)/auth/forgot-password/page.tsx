"use client";

import AuthFormWrapper from "@/components/wrappers/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useForgotPassword } from "@/services/auth";
import { IFormInput } from "@/components/form/constants";
import { useRouter } from "next/navigation";
import { Oval } from "react-loading-icons";

export default function ForgotPassword() {
  const forgotPassword = useForgotPassword();

  const handleForgot = async ({ values }: { values: { email: string } }) => {
    forgotPassword.mutate({ email: values.email });
  };

  return (
    <AuthFormWrapper title="Forgot Password" hideSocials>
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={forgotSchema}
        onFormSubmit={handleForgot}
      >
        <Button
          type="submit"
          color="secondary"
          isProcessing={forgotPassword.isPending}
          disabled={forgotPassword.isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          Get reset link
          {!forgotPassword.isPending && <ArrowRightCircle className="ml-1" />}
        </Button>
      </DynamicForm>
    </AuthFormWrapper>
  );
}

const formInfo: IFormInput[] = [
  {
    name: "email",
    label: "Enter Email Address",
    type: "email",
    textInputProp: {
      placeholder: "Enter your email address",
    },
  },
];

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
});

const defaultValues = {
  email: "",
};
