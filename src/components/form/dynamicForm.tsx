"use client";

import { Checkbox, FileInput, Label, Radio, Select, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "./constants";
import { BusinessNameInput, BusinessObjectiveInput, CountryInput } from "../input";
import { useDynamic } from "@/hooks/useDynamic";

const DynamicForm = ({
  children,
  formInfo,
  defaultValues,
  formSchema,
  onFormSubmit,
}: DynamicFormProps) => {
  const dynamic = useDynamic({ subForms: formInfo });

  const schema = formSchema || dynamic.schema;
  const dValues = defaultValues || dynamic.defaultValues;

  type formType = z.infer<typeof schema>;

  // Form definition
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: dValues,
  });

  // Submit handler
  function onSubmit(values: formType) {
    // console.log(values);
    onFormSubmit && onFormSubmit(values);
  }

  useEffect(() => {
    if (dValues) {
      formInfo.forEach((el) => setValue(el.name, defaultValues[el.name] || el.value));
    }
  }, [formInfo, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {(formInfo || []).map((el, i: number) => {
        const isTextInput = el.type === "text" || el.type === "password" || el.type === "email";
        const errorMsg = errors[el.name]?.message;

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
                helperText={<>{errorMsg}</>}
                color={errorMsg && "failure"}
                {...el.textInputProp}
                {...register(el.name)}
              />
            )}

            {(el.type === "address" ||
              el.type === "email address" ||
              el.type === "short answer") && (
              <TextInput
                id={el.name}
                type={el.type}
                sizing="md"
                helperText={<>{errorMsg}</>}
                color={errorMsg && "failure"}
                // {...el.textInputProp}
                {...register(el.name)}
              />
            )}

            {el.type === "checkbox" && (
              <Checkbox id={el.name} defaultChecked {...register(el.name)} />
            )}

            {el.type === "radio" && <Radio id={el.name} {...register(el.name)} />}

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
                color={errorMsg && "failure"}
                helperText={<>{errorMsg}</>}
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
                value={watch(el.name) || []}
                setValue={(value: string[]) => setValue(el.name, value)}
                error={errorMsg as string | undefined}
              />
            )}

            {el.type === "objectives" && (
              <BusinessObjectiveInput
                id={el.id!}
                // question={el.question}
                options={el.selectOptions || []}
                value={watch(el.name) || []}
                setValue={(value: string[]) => setValue(el.name, value)}
                error={errorMsg as string | undefined}
              />
            )}

            {el.type === "countries" && (
              <CountryInput
                id={el.id}
                value={watch(el.name) || []}
                setValue={(value: string) => setValue(el.name, value)}
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
