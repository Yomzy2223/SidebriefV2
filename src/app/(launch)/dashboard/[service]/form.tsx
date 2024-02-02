"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { useGetServiceFormSubForms } from "@/services/service";
import {
	BusinessNameInput,
	BusinessObjectiveInput,
	CountryInput,
	LoadingSkeleton,
} from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export const LaunchForm1 = ({ serviceFormId }: { serviceFormId: string }) => {
	const router = useRouter();

	const { data, isLoading } = useGetServiceFormSubForms(serviceFormId);

	const subForms = data?.data.data;

	// generate a zod schema based on the subforms data

	const schema =
		isLoading || subForms === undefined
			? z.object({})
			: z.object(
					Object.fromEntries(
						subForms.map((field) => {
							switch (field.type) {
								case "business-name":
									return [
										field.type,
										z
											.array(
												z
													.string()
													.min(
														1,
														"Name must have at least one character"
													)
											)
											.length(
												4,
												"Enter 4 business names"
											),
									];
								case "business-objective":
									return [
										field.type,
										z
											.array(z.string())
											.length(
												4,
												"Enter 4 business objectives"
											),
									];
								case "country":
									return [field.type, z.string()];
								// Add more cases as needed
								default:
									return [field.type, z.any()]; // Default validation if no specific type matches
							}
						})
					)
			  );

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			"business-name": [],
			"business-objective": [],
			country: "",
		},
	});

	const submitFormHandler = (values: z.infer<typeof schema>) => {
		// event.preventDefault();
		console.log("I am here");
		console.log(values);
		// router.push("/dashboard/launch/plan");
	};

	return (
		<form
			onSubmit={form.handleSubmit(submitFormHandler)}
			className="flex flex-col gap-20 items-start"
		>
			{isLoading ? (
				<>
					{[1, 2, 3]?.map((number) => (
						<LoadingSkeleton key={number} />
					))}
				</>
			) : (
				<>
					{subForms?.map((input) => {
						switch (input.type) {
							case "business-name":
								return (
									<BusinessNameInput
										key={input.id}
										id={input.id}
										question={input.question}
										value={form.watch(input.type)}
										setValue={(value: string[]) =>
											form.setValue(input.type, value)
										}
									/>
								);
							case "business-objective":
								return (
									<BusinessObjectiveInput
										key={input.id}
										id={input.id}
										question={input.question}
										options={input.options}
										value={form.watch(input.type)}
										setValue={(value: string[]) =>
											form.setValue(input.type, value)
										}
									/>
								);
							case "country":
								return (
									<CountryInput
										id={input.id}
										question={input.question}
										key={input.id}
										value={form.watch(input.type)}
										setValue={(value: string) =>
											form.setValue(input.type, value)
										}
									/>
								);
							default:
								return null; // Or some fallback component
						}
					})}
				</>
			)}
			<Button color="secondary" size={"lg"} type="submit">
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>
		</form>
	);
};
