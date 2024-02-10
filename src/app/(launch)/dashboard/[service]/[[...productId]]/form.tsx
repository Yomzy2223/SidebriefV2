"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/flowbite";
import { ArrowRight, CogOutline } from "@/assets/icons";
import { useGetServiceFormSubForms } from "@/services/service";
import {
	BusinessNameInput,
	BusinessObjectiveInput,
	CountryInput,
	LoadingSkeleton,
} from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewProduct, useGetProductQA } from "@/services/product";
import { useGetCountries } from "@/services/service";
import { useActions } from "./actions";
import { useEffect, useState } from "react";

export const LaunchForm1 = ({
	serviceFormId,
	urlProductId,
}: {
	serviceFormId: string;
	urlProductId?: string;
}) => {
	const createProduct = useCreateNewProduct();

	const [formset, setFormset] = useState(false);

	const productQA = useGetProductQA(urlProductId);

	const { data, isLoading } = useGetServiceFormSubForms(serviceFormId);

	const countries = useGetCountries();

	const subForms = data?.data.data;

	const { schema, defaultValues, saveFormProductQA, savingForm } = useActions(
		{
			isLoading,
			subForms,
		}
	);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
	});

	useEffect(() => {
		if (
			urlProductId &&
			!productQA.isLoading &&
			productQA.data &&
			!formset
		) {
			const QA = productQA.data.data.data;
			QA.forEach((qa) => {
				switch (qa.type) {
					case "country":
						form.setValue(qa.type, qa.answer[0]);
						break;
					default:
						form.setValue(qa.type, qa.answer);
				}
			});
			setFormset(true);
		}
	}, [urlProductId, productQA, form, formset]);

	const submitFormHandler = (values: { [x: string]: string | string[] }) => {
		if (urlProductId) {
			saveFormProductQA(urlProductId, values);
			return;
		}
		createProduct.mutate(
			{
				// dummy user Id
				// TODO: user ID should be changed later
				userId: "0fe8efaa-161f-4570-8433-1cf8772427c6",
			},
			{
				onSuccess(data, variables, context) {
					const productId = data.data.data.id;

					saveFormProductQA(productId, values);
				},
				onError(error: any, variables, context) {
					console.log(error);
					console.log(error.response.data.error);
				},
			}
		);
	};

	return (
		<form
			onSubmit={form.handleSubmit(submitFormHandler)}
			className="flex flex-col gap-20 items-start"
		>
			{isLoading || productQA.isLoading ? (
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
										value={form.watch(input.type) || []}
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
										value={form.watch(input.type) || []}
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
										value={form.watch(input.type) || ""}
										setValue={(value: string) =>
											form.setValue(input.type, value)
										}
										loading={countries.isLoading}
										countries={
											countries.data?.data.data || []
										}
									/>
								);
							default:
								return null; // Or some fallback component
						}
					})}
				</>
			)}
			<Button
				color="secondary"
				size={"lg"}
				type="submit"
				isProcessing={createProduct.isPending || savingForm}
				disabled={isLoading}
			>
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>
		</form>
	);
};
