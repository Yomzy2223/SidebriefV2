"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button, Checkbox, Label } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React from "react";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";

const SignIn = () => {
	const session = useSession();

	const handleSignIn = async (values: any) => {
		const response = await signIn("signIn", {
			redirect: true,
			email: values.email,
			password: values.password,
		});
	};

	const handleSignInWithGoogle = async () => {
		const response = await signIn("google");
		console.log(response);
	};

	const handleSignInWithYahoo = async () => {
		const response = await signIn("yahoo");
		console.log(response);
	};

	return (
		<AuthFormWrapper
			login
			handlers={{
				google: handleSignInWithGoogle,
				yahoo: handleSignInWithYahoo,
			}}
		>
			<DynamicForm
				formInfo={formInfo}
				defaultValues={defaultValues}
				formSchema={signInSchema}
				onFormSubmit={handleSignIn}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember" className="flex">
							Remember me
						</Label>
					</div>
					<Button
						color="link"
						size="fit"
						className="text-foreground hover:underline"
						href="/auth/forgot-password"
					>
						Forgotten password
					</Button>
				</div>
				<div className="flex items-center justify-between">
					<Button type="submit" color="secondary">
						Continue to Sign In{" "}
						<ArrowRightCircle className="ml-1" />
					</Button>
					<div className="flex flex-wrap gap-1">
						<p className="sb-text-16 text-foreground-3">
							Don&#39;t have an account?{" "}
						</p>
						<Button
							color="link"
							size="fit"
							className="text-primary hover:underline"
							href="/auth/signup"
						>
							Sign up
						</Button>
					</div>
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
