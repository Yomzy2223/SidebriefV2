"use client";

import AuthFormWrapper from "@/components/wrappers/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import * as z from "zod";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useResetPassword } from "@/services/auth";
import { IFormInput } from "@/components/form/constants";
import { useRouter } from "next/navigation";
import { Oval } from "react-loading-icons";

export default function ForgotPassword() {
  const router = useRouter();

  const resetPassword = useResetPassword();

  const handleForgot = ({ values }: { values: { password: string } }) => {
    resetPassword.mutate(
      { password: values.password, token: "" },
      {
        onSuccess: () => router.push(""),
      }
    );
  };

  return (
    <AuthFormWrapper title="Reset Password" hideSocials>
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={resetSchema}
        onFormSubmit={handleForgot}
      >
        <Button
          type="submit"
          color="secondary"
          isProcessing={resetPassword.isPending}
          disabled={resetPassword.isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          Reset password {!resetPassword.isPending && <ArrowRightCircle className="ml-1" />}
        </Button>
      </DynamicForm>
    </AuthFormWrapper>
  );
}

const formInfo: IFormInput[] = [
  {
    name: "password",
    label: "Enter new password",
    type: "password",
    textInputProp: {
      placeholder: "Enter your new Password",
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm new password",
    type: "password",
    textInputProp: {
      placeholder: "Enter your new Password",
    },
  },
];

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be 6 or more characters"),
    confirmPassword: z.string().min(1, { message: "Confirm new password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const defaultValues = {
  password: "",
  confirmPassword: "",
};
