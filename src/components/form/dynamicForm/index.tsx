import { Checkbox, Label, Radio, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "../constants";
import ComboBox from "./comboBox";
import { cn } from "@/lib/utils";
import MultiSelectCombo from "./multiSelectCombo";
import InputWithTags from "@/components/input/inputWithTags";
import { countries } from "countries-list";
import { FileInput } from "@/components/file/fileInput";
import { useGetCountries } from "@/services/service";
import { getDynamicSchema, getVisibilityStatus, resetDependees } from "./actions";
import ListOptions from "./listOptions";

const DynamicForm = ({
  children,
  formInfo,
  defaultValues,
  formSchema,
  onFormSubmit,
  disableAll,
  formClassName,
  className,
  fullFormInfo,
}: DynamicFormProps) => {
  const [rerender, setRerender] = useState(false);

  let subFormsRef = useRef<any>([]);
  const dynamic = getDynamicSchema({ subForms: subFormsRef.current });

  const schema = formSchema || dynamic.schema;

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
    resetField,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Submit handler
  function onSubmit(values: formType) {
    onFormSubmit && onFormSubmit({ values, reset });
  }

  useEffect(() => {
    const newFormInfo = formInfo?.filter((field) =>
      getVisibilityStatus({ field, getValues, fullFormInfo })
    );
    subFormsRef.current = newFormInfo;
  }, [getValues()]);

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-8 justify-between flex-1 min-h-full", formClassName)}
    >
      <div className={cn("flex flex-col justify-start gap-8", className)}>
        {(formInfo || []).map((el, i: number) => {
          const isTextInput =
            el.type === "text" ||
            el.type === "email" ||
            el.type === "phone number" ||
            el.type === "promocode" ||
            el.type === "password" ||
            el.type === "short answer";
          const isSelect =
            el.type === "select" ||
            el.type === "countries-all" ||
            el.type === "countries-operation";
          const errorMsg = errors[el.name]?.message;
          let type = el.type === "phone number" ? "number" : "text";
          if (el.type === "password") type = "password";

          let selectOptions = el.options;
          switch (el.type) {
            case "countries-all":
              selectOptions = Object.values(countries).map((country) => country.name);
              break;
            case "countries-operation":
              selectOptions = sidebriefCountries;
          }

          let showField = getVisibilityStatus({ field: el, getValues, fullFormInfo });
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

              {/* {isTextInput && (
                <div className="w-full flex items-center">
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
                  {el.rightText && (
                    <span className="ml-2 underline decoration-solid decoration-sky-500">  
                      {el.rightText}
                    </span>
                  )}
                </div>
              )} */}

              {el.type === "paragraph" && (
                <Textarea
                  id={el.name}
                  helperText={<>{errorMsg}</>}
                  color={errorMsg && "failure"}
                  className={errorMsg ? "focus:[&_input]:ring-0" : ""}
                  {...el.textInputProp}
                  {...register(el.name)}
                />
              )}

              {(el.type === "checkbox" || el.type === "multiple choice") && (
                <ListOptions
                  name={el.name}
                  options={el.options}
                  type={el.type}
                  allowOther={el.allowOther}
                  setValue={setValue}
                  defaultValue={el.value}
                  errorMsg={errorMsg as string}
                />
              )}

              {(el.type === "document template" || el.type === "document upload") && (
                <FileInput
                  onFileChange={(file) => setValue(el.name, file, { shouldValidate: true })}
                  fileName={el.fileName || ""}
                  fileLink={el.fileLink || ""}
                  fileType={el.fileType || ""}
                  fileSize={el.fileSize || ""}
                  errorMsg={errorMsg as string}
                />
              )}

              {isSelect && (
                <ComboBox
                  name={el.name}
                  options={selectOptions || []}
                  setValue={setValue}
                  errorMsg={errorMsg?.toString()}
                  selectProp={el.selectProp}
                  placeholder={el.placeholder}
                  handleSelect={(value) => {
                    setRerender(!rerender);
                    resetDependees({ question: el.label || "", fullFormInfo, setValue });
                    el.handleSelect && el.handleSelect(value);
                  }}
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
                  options={el.options || []}
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
