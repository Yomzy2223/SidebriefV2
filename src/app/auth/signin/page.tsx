"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { AuthStepper } from "@/components/stepper/auth";
import { Button } from "flowbite-react";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as z from "zod";

const SignIn = () => {
  const handleSignIn = (values: any) => {
    console.log(values);
  };

  return (
    <AuthFormWrapper login>
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={signInSchema}
        onFormSubmit={handleSignIn}
      >
        <div className="flex items-center gap-14">
          <Button type="submit" color="magenta">
            Continue to Sign In <ArrowRightCircle className="ml-1" />
          </Button>
          <p className="sb-text-18 text-foreground-3">
            Don&#39;t have an account?{" "}
            <span className="text-primary">Sign Up</span>
          </p>
        </div>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default SignIn;

const formInfo = [
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
      placeholder: "Enter your password",
    },
  },
];

const signInSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .min(1, { message: "Enter your email address" }),
  password: z.string().min(6, "Password must be 6 or more characters"),
});

const defaultValues = {
  email: "",
  password: "",
};
