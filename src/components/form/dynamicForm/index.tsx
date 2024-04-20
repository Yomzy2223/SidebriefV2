import { Checkbox, FileInput, Label, Radio, Select, TextInput } from "flowbite-react";
import React, { useEffect, useMemo, useRef, useCallback, MutableRefObject } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "../constants";
import { BusinessNameInput, BusinessObjectiveInput, CountryInput, AllCOuntries } from "../../input";
import { useDynamic } from "@/hooks/useDynamic";
import ComboBox from "./comboBox";
import { cn } from "@/lib/utils";
import MultiSelectCombo from "./multiSelectCombo";
import InputWithTags from "@/components/input/inputWithTags";

const DynamicForm = ({
  children,
  formInfo,
  defaultValues,
  formSchema,
  onFormSubmit,
  watchValues,
  resetForm,
  disableAll,
  formClassName,
  className,
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
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: dValues,
  });

  // Submit handler
  function onSubmit(values: formType) {
    // console.log(values);
    onFormSubmit && onFormSubmit(values);
  }

  const setResetter = useCallback(() => {
    resetForm && resetForm(reset);
  }, [reset, resetForm]);

  setResetter();

  useEffect(() => {
    const subscription = watch((values) => watchValues && watchValues(values));
    return () => subscription.unsubscribe();
  }, [watch, watchValues]);

  const prevFormInfoRef = useRef(formInfo);

  useEffect(() => {
    if (JSON.stringify(prevFormInfoRef.current) !== JSON.stringify(formInfo)) {
      (formInfo || []).forEach((form) => {
        if (form.value) {
          setValue(form.name, form.value);
        }
      });
      prevFormInfoRef.current = formInfo;
    }
  }, [setValue, formInfo]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-8 justify-between flex-1 max-w-[500px]", formClassName)}
    >
      <div className={cn("flex flex-col justify-start gap-8", className)}>
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
                  className={errorMsg ? "focus:[&_input]:ring-0" : ""}
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
                  className={errorMsg ? "focus:[&_input]:outline-none" : ""}
                  helperText={<>{errorMsg}</>}
                  color={errorMsg && "failure"}
                  // {...el.textInputProp}
                  {...register(el.name)}
                />
              )}

              {el.type === "countries-all" && (
                <AllCOuntries
                  value={watch(el.name) || ""}
                  setValue={(value: string) => setValue(el.name, value)}
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
                <ComboBox
                  name={el.name}
                  options={el.selectOptions}
                  setValue={setValue}
                  errorMsg={errorMsg?.toString()}
                  selectProp={el.selectProp}
                  handleSelect={el.handleSelect}
                  fieldName="options"
                  leftContent={el.leftContent}
                  defaultValue={el.value as string}
                  disabled={disableAll}
                  optionsLoading={el.optionsLoading}
                  optionsErrorMsg={el.optionsErrorMsg}
                />
              )}

              {el.type === "objectives" && (
                <MultiSelectCombo
                  name={el.name}
                  options={el.selectOptions}
                  setValue={setValue}
                  selectProp={el.selectProp}
                  fieldName="objectives"
                  defaultTags={el.value as string[]}
                  disabled={disableAll}
                  optionsLoading={el.optionsLoading}
                  errorMsg={errorMsg?.toString()}
                />
              )}

              {el.type === "business name" && (
                <InputWithTags
                  submitErr={errorMsg}
                  maxTag={4}
                  minTagChars={3}
                  handleKeyDown={(tags) => setValue(el.name, tags)}
                  defaultTags={el.value as string[]}
                  disabled={disableAll}
                  errors={{
                    empty: "Enter a business name",
                    exists: "Business name already exists",
                    length: "You can only enter 4 business names",
                    minTagChars: "Business name must be more than 3 characters",
                  }}
                />
              )}

              {/* {el.type === "business name" && (
                <BusinessNameInput
                  id={el.id!}
                  // question={el.}
                  value={watch(el.name) || []}
                  setValue={(value: string[]) => setValue(el.name, value)}
                  error={errorMsg as string | undefined}
                />
              )} */}

              {/* {el.type === "objectives" && (
                <BusinessObjectiveInput
                  id={el.id!}
                  // question={el.question}
                  options={el.selectOptions || []}
                  value={watch(el.name) || []}
                  setValue={(value: string[]) => setValue(el.name, value)}
                  error={errorMsg as string | undefined}
                />
              )} */}

              {el.type === "countries" && (
                <CountryInput
                  id={el.id}
                  value={watch(el.name) || ""}
                  setValue={(value: string) => setValue(el.name, value)}
                />
              )}
            </div>
          );
        })}
      </div>

      {children}
    </form>
  );
};

export default DynamicForm;
