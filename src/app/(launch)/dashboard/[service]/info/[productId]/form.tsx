"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/flowbite";
import { ArrowRight, CogOutline } from "@/assets/icons";
import { useGetServiceFormSubForms } from "@/services/service";
import { LoadingSkeleton } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewProduct, useGetProductQA } from "@/services/product";
import { useGetCountries } from "@/services/service";
import { useActions } from "./actions";
import { useEffect, useState } from "react";
import DynamicForm from "@/components/form/dynamicForm";
import slugify from "slugify";
import { serviceFormSubFormType } from "@/services/service/types";

export const LaunchForm1 = ({
	subForms,
	urlProductId,
}: {
	subForms: serviceFormSubFormType[];
	// serviceFormId: string;
	urlProductId?: string;
}) => {
	const createProduct = useCreateNewProduct();

	const [formset, setFormset] = useState(false);

	const [values, setValues] = useState<{ [key: string]: string | string[] }>(
		{}
	);

	const productQA = useGetProductQA(urlProductId);

	// const { data, isLoading } = useGetServiceFormSubForms(serviceFormId);

	// const subForms = data?.data.data;

	const { saveFormProductQA, savingForm } = useActions({
		subForms,
	});

	// console.log(subForms);

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
						setValues((prev) => ({
							...prev,
							[slugify(qa.question)]: qa.answer[0],
						}));
						break;
					default:
						setValues((prev) => ({
							...prev,
							[slugify(qa.question)]: qa.answer,
						}));
				}
			});
			setFormset(true);
		}
	}, [urlProductId, productQA, formset]);

	const submitFormHandler = (values: { [x: string]: string | string[] }) => {
		if (urlProductId) {
			saveFormProductQA(urlProductId, values);
			return;
		}
		createProduct.mutate(
			{
				// dummy user Id
				// TODO: user ID should be changed later
				userId: "5c99014f-4d5f-4771-9c6e-8e56d3afd819",
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
		<div
			// onSubmit={form.handleSubmit(submitFormHandler)}
			className="flex flex-col gap-20 items-stretch"
		>
			{productQA.isLoading ? (
				<>
					{[1, 2, 3]?.map((number) => (
						<LoadingSkeleton key={number} />
					))}
				</>
			) : (
				<>
					<DynamicForm
						formInfo={
							subForms?.map((input) => {
								return {
									name: slugify(input.question),
									type: input.type,
									id: input.id,
									label: input.question,
									selectOptions: input.options,
									value: values[input.type],
								};
							})!
						}
						onFormSubmit={submitFormHandler}
					>
						<Button
							color="secondary"
							size={"lg"}
							type="submit"
							isProcessing={createProduct.isPending || savingForm}
							// disabled={isLoading}
						>
							<div className="space-x-2 flex items-center">
								<p>Continue</p>
								<ArrowRight />
							</div>
						</Button>
					</DynamicForm>
				</>
			)}
			{/* <Button
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
			</Button> */}
		</div>
	);
};
