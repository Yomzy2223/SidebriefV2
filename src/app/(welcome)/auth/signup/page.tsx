"use client";

import AuthFormWrapper from "@/components/wrappers/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { AuthStepper } from "@/app/(welcome)/auth/authStepper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useResponse } from "@/hooks/useResponse";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Oval } from "react-loading-icons";
import * as z from "zod";
import { IFormInput } from "@/components/form/constants";

const SignUp = () => {
  const [isPending, setIsPending] = useState(false);
  const { push } = useRouter();
  const { handleError, handleSuccess } = useResponse();
  const { isDesktop } = useGlobalFunctions();

  const handleSignUp = async ({ values }: { values: signUpType }) => {
    setIsPending(true);
    const response = await signIn("signUp", {
      redirect: false,
      fullName: values.name,
      email: values.email,
      password: values.password,
      referral: values.referral,
      isPartner: false,
      isStaff: false,
    });
    setIsPending(false);

    if (response?.error) handleError({ error: response?.error });
    else {
      handleSuccess({ data: "Sign up successfully" });
      push("/welcome/select-service");
    }
  };

  const handleSignUpWithGoogle = async () => {
    await signIn("google", { redirect: true });
  };

  return (
    <AuthFormWrapper
      title="Create an account for free"
      description="Join our 500+ customers to scale your business."
      handlers={{
        google: handleSignUpWithGoogle,
      }}
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={signUpSchema}
        onFormSubmit={handleSignUp}
      >
        <p className="text-foreground-3 my-6">
          By Signing up you agree to our{" "}
          <Link href="" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="" className="underline">
            Privacy Policy
          </Link>
        </p>

        <AuthStepper />

        <div className="flex items-center justify-between gap-14">
          <div className="sb-text-16 text-foreground-3">
            {isDesktop ? <span>Have an account? </span> : ""}
            <Button color="plain" size="fit" className="text-primary" href="/auth/signin">
              Sign In
            </Button>
          </div>
          <Button
            type="submit"
            color="secondary"
            isProcessing={isPending}
            disabled={isPending}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          >
            <span className="first-letter:capitalize">
              {isDesktop ? "Click to" : ""} create account{" "}
            </span>
            {!isPending && <ArrowRightCircle className="ml-1" />}
          </Button>
        </div>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default SignUp;

const formInfo: IFormInput[] = [
  {
    name: "name",
    label: "Hello, Tell us your name",
    type: "text",
    textInputProp: {
      placeholder: "Enter your name",
    },
  },
  {
    name: "email",
    label: "Enter Email Address",
    type: "email",
    textInputProp: {
      placeholder: "Enter your email address",
    },
  },
  {
    name: "password",
    label: "Enter Password",
    type: "password",
    textInputProp: {
      placeholder: "Enter a password",
    },
  },
  {
    name: "referral",
    label: "How did you hear about us",
    type: "select",
    selectProp: {
      placeholder: "Select a referral",
    },
    options: ["Facebook", "Twitter", "Google", "Instagram", "WhatsApp", "Recommendation"],
  },
];

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Enter your first name" }),
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
  password: z.string().min(6, "Password must be 6 or more characters"),
  referral: z.string().min(1, { message: "Select an option" }),
});

type signUpType = z.infer<typeof signUpSchema>;

const defaultValues = {
  name: "",
  email: "",
  password: "",
  referral: "",
};
