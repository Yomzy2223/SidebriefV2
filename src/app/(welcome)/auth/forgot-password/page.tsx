"use client";

import AuthFormWrapper from "@/components/wrappers/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useForgotPassword } from "@/services/auth";

export default function ForgotPassword() {
  const forgotPassword = useForgotPassword();

  const handleForgot = async (values: { email: string }) => {
    forgotPassword.mutate(
      { email: values.email },
      {
        onError: (err: any) => {
          console.log(err.response.data.error);
        },
        onSuccess: (data) => {
          console.log(data);
        },
      }
    );
  };

  return (
    <AuthFormWrapper title="Forgot Password">
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={forgotSchema}
        onFormSubmit={handleForgot}
      >
        <Button type="submit" color="secondary" isProcessing={forgotPassword.isPending}>
          Get reset link <ArrowRightCircle className="ml-1" />
        </Button>
      </DynamicForm>
    </AuthFormWrapper>
  );
}

const formInfo = [
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
