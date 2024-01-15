"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { AuthStepper } from "@/components/stepper/auth";
import { Button } from "flowbite-react";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import * as z from "zod";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = (values: any) => {
    console.log(values);
    router.push("/auth/signup/select-service");
  };

  return (
    <AuthFormWrapper>
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

        <div className="flex items-center gap-14">
          <p className="sb-text-16 text-foreground-3">
            Have an account?{" "}
            <Button color="plain" size="fit" className="text-primary">
              Sign In
            </Button>
          </p>
          <Button type="submit" color="magenta">
            Click to create account <ArrowRightCircle className="ml-1" />
          </Button>
        </div>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default SignUp;

const formInfo = [
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
    selectOptions: [
      "Facebook",
      "Twitter",
      "Google",
      "Instagram",
      "WhatsApp",
      "Recommendation",
    ],
  },
];

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Enter your first name" }),
  email: z
    .string()
    .email("Enter a valid email")
    .min(1, { message: "Enter your email address" }),
  password: z.string().min(6, "Password must be 6 or more characters"),
  referral: z.string().min(1, { message: "Select an option" }),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  referral: "",
};
