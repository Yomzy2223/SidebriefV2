"use client";

import AuthFormWrapper from "@/components/wrappers/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useResetPassword } from "@/services/auth";

export default function ForgotPassword() {
  const resetPassword = useResetPassword();

  const handleForgot = (values: { password: string }) => {
    console.log("Reset Password");
    console.log(values);
    resetPassword.mutate({ password: values.password, token: "" });
  };

  return (
    <AuthFormWrapper title="Reset Password">
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={resetSchema}
        onFormSubmit={handleForgot}
      >
        <Button type="submit" color="secondary" isProcessing={resetPassword.isPending}>
          Reset password <ArrowRightCircle className="ml-1" />
        </Button>
      </DynamicForm>
    </AuthFormWrapper>
  );
}

const formInfo = [
  {
    name: "password",
    label: "Enter new password",
    type: "password",
    textInputProp: {
      placeholder: "Enter your new Password",
    },
  },
];

const resetSchema = z.object({
  password: z.string().min(1, { message: "Field can't be empty" }),
});

const defaultValues = {
  password: "",
};
