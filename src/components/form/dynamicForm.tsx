"use client";

import {
	Checkbox,
	FileInput,
	Label,
	Radio,
	Select,
	TextInput,
	ToggleSwitch,
} from "flowbite-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "./constants";
import {
	BusinessNameInput,
	BusinessObjectiveInput,
	CountryInput,
} from "../input";
import { useDynamic } from "@/hooks/useDynamic";

const DynamicForm = ({
	children,
	formInfo,
	onFormSubmit,
}: DynamicFormProps) => {
	const { defaultValues, schema } = useDynamic({ subForms: formInfo });

	type formType = z.infer<typeof schema>;

	// Form definition
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<formType>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	// Submit handler
	function onSubmit(values: formType) {
		onFormSubmit && onFormSubmit(values);
	}

	useEffect(() => {
		formInfo.forEach((form) => {
			if (form.value) {
				setValue(form.name, form.value);
			}
		});
	}, [formInfo, setValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{formInfo.map((el, i: number) => {
				const isTextInput =
					el.type === "text" ||
					el.type === "password" ||
					el.type === "email";

				return (
					<div key={i}>
						{el.label && (
							<div className="mb-2 block">
								<Label htmlFor={el.name} value={el.label} />
							</div>
						)}

						{isTextInput && (
							<TextInput
								id={el.name}
								type={el.type}
								sizing="md"
								helperText={
									<>
										{
											errors[
												el.name as keyof typeof errors
											]?.message
										}
									</>
								}
								color={
									errors[el.name as keyof typeof errors] &&
									"failure"
								}
								{...el.textInputProp}
								{...register(el.name)}
							/>
						)}

						{el.type === "checkbox" && (
							<Checkbox
								id={el.name}
								defaultChecked
								{...register(el.name)}
							/>
						)}

						{el.type === "radio" && (
							<Radio id={el.name} {...register(el.name)} />
						)}

						{el.type === "file" && (
							<FileInput
								id={el.name}
								helperText="A profile picture is useful to confirm your are logged into your account"
								{...register(el.name)}
							/>
						)}

						{el.type === "select" && el.selectOptions && (
							<Select
								id={el.name}
								placeholder="dkcdslcj"
								color={
									errors[el.name as keyof typeof errors] &&
									"failure"
								}
								helperText={
									<>
										{
											errors[
												el.name as keyof typeof errors
											]?.message
										}
									</>
								}
								{...el.selectProp}
								{...register(el.name)}
							>
								{el.selectOptions.map((option) => (
									<option key={option}>{option}</option>
								))}
							</Select>
						)}

						{el.type === "business name" && (
							<BusinessNameInput
								id={el.id!}
								// question={el.}
								value={watch(el.type) || []}
								setValue={(value: string[]) =>
									setValue(el.type, value)
								}
								error={
									errors[el.type as keyof typeof errors]
										?.message as string | undefined
								}
							/>
						)}

						{el.type === "objectives" && (
							<BusinessObjectiveInput
								id={el.id!}
								// question={el.question}
								options={el.selectOptions || []}
								value={watch(el.type) || []}
								setValue={(value: string[]) =>
									setValue(el.type, value)
								}
								error={
									errors[el.type as keyof typeof errors]
										?.message as string | undefined
								}
							/>
						)}

						{el.type === "countries" && (
							<CountryInput
								id={el.id}
								value={watch(el.type) || []}
								setValue={(value: string) =>
									setValue(el.type, value)
								}
							/>
						)}
					</div>
				);
			})}

			{children}
		</form>
	);
};

export default DynamicForm;

//  {
//    el.type === "toggle" && (
//      <ToggleSwitch
//        checked={getValues()[el.name]}
//        label="Toggle me (checked)"
//        // {...register(el.name)}
//        onChange={() => setValue(el.name, !getValues()[el.name])}
//      />
//    );
//  }
