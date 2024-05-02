import { Checkbox, Label, Radio, Select, TextInput } from "flowbite-react";
import React, { useEffect, useMemo, useRef, useCallback, MutableRefObject } from "react";
import { useForm, Controller, FormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "../constants";
import { useDynamic } from "@/hooks/useDynamic";
import ComboBox from "./comboBox";
import { cn, sluggify } from "@/lib/utils";
import MultiSelectCombo from "./multiSelectCombo";
import InputWithTags from "@/components/input/inputWithTags";
import { countries } from "countries-list";
import { FileInput } from "@/components/file/fileInput";
import { useGetCountries } from "@/services/service";
import { getDynamicSchema } from "./actions";

const DynamicForm = ({
  children,
  formInfo,
  defaultValues,
  formSchema,
  onFormSubmit,
  watchValues,
  disableAll,
  formClassName,
  className,
  setFormState,
}: DynamicFormProps) => {
  const dynamic = getDynamicSchema({ subForms: formInfo });

  const schema = formSchema || dynamic.schema;
  const dValues = defaultValues;

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
    onFormSubmit && onFormSubmit({ values, reset });
  }

  useEffect(() => {
    const subscription = watch((values) => watchValues && watchValues(values));
    return () => subscription.unsubscribe();
  }, [watch, watchValues]);

  useEffect(() => {
    (formInfo || []).forEach((form) => {
      if (form.value) {
        setValue(form.name, form.value);
      }
      if (form.fileName && form.fileLink && form.fileType && form.fileSize) {
        setValue(form.name, {
          fileName: form.fileName,
          fileLink: form.fileLink,
          fileType: form.fileType,
          fileSize: form.fileSize,
        });
      }
    });
  }, [setValue, formInfo]);

  const countriesRes = useGetCountries();
  const sidebriefCountries = countriesRes.data?.data?.data?.map((el) => el.name);

  console.log(getValues());
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex flex-col gap-8 justify-between flex-1 max-w-[500px] min-h-full",
        formClassName
      )}
    >
      <div className={cn("flex flex-col justify-start gap-8", className)}>
        {(formInfo || []).map((el, i: number) => {
          const isTextInput =
            el.type === "email" ||
            el.type === "phone number" ||
            el.type === "paragraph" ||
            el.type === "promocode" ||
            el.type === "password" ||
            el.type === "short answer";
          const isSelect =
            el.type === "select" ||
            el.type === "countries-all" ||
            el.type === "countries-operation" ||
            el.type === "multiple choice";
          const errorMsg = errors[el.name]?.message;
          let type = el.type === "phone number" ? "number" : "text";
          if (el.type === "password") type = "password";

          let selectOptions;
          switch (el.type) {
            case "countries-all":
              selectOptions = Object.values(countries).map((country) => country.name);
              break;
            case "countries-operation":
              selectOptions = sidebriefCountries;
          }

          // console.log(el.dependsOn);
          // const dependedOn = el.dependsOn;
          // console.log(dependedOn);
          let showField = true;
          if (el.dependsOn?.field) {
            const currValue = getValues(sluggify(el.dependsOn?.field || ""))?.toLowerCase();
            if (el.dependsOn?.options) {
              showField = !!el.dependsOn?.options?.find((el) => el?.toLowerCase() === currValue);
            } else {
              showField = !!currValue;
            }
          }

          if (!showField) return;

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
                  type={type}
                  sizing="md"
                  helperText={<>{errorMsg}</>}
                  color={errorMsg && "failure"}
                  className={errorMsg ? "focus:[&_input]:ring-0" : ""}
                  {...el.textInputProp}
                  {...register(el.name)}
                />
              )}
              {/* {el.type === "countries-all" && (
                <AllCOuntries
                  value={watch(el.name) || ""}
                  setValue={(value: string) => setValue(el.name, value)}
                />
              )} */}
              {el.type === "checkbox" && (
                <Checkbox id={el.name} defaultChecked {...register(el.name)} />
              )}
              {el.type === "multiple choice" && <Radio id={el.name} {...register(el.name)} />}

              {(el.type === "document template" || el.type === "document upload") && (
                <FileInput
                  onFileChange={(file) => setValue(el.name, file, { shouldValidate: true })}
                  fileName={el.fileName || ""}
                  fileLink={el.fileLink || ""}
                  fileType={el.fileType || ""}
                  fileSize={el.fileSize || ""}
                  errorMsg={errorMsg as string}
                />
                // <FileInput
                //   id={el.name}
                //   helperText="A profile picture is useful to confirm your are logged into your account"
                //   {...register(el.name)}
                // />
              )}
              {isSelect && (
                <ComboBox
                  name={el.name}
                  options={selectOptions || el.selectOptions || []}
                  setValue={setValue}
                  errorMsg={errorMsg?.toString()}
                  selectProp={el.selectProp}
                  handleSelect={el.handleSelect}
                  fieldName="options"
                  leftContent={el.leftContent}
                  defaultValue={el.value as string}
                  disabled={disableAll}
                  optionsLoading={el.optionsLoading || countriesRes.isLoading}
                  optionsErrorMsg={el.optionsErrorMsg}
                />
              )}
              {el.type === "objectives" && (
                <MultiSelectCombo
                  name={el.name}
                  options={el.selectOptions || []}
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
              {/* {el.type === "countries" && (
                <CountryInput
                  id={el.id}
                  value={watch(el.name) || ""}
                  setValue={(value: string) => setValue(el.name, value)}
                />
              )} */}
            </div>
          );
        })}
      </div>

      {children}
    </form>
  );
};

export default DynamicForm;
