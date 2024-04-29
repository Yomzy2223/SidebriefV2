import { TFieldTypes } from "@/services/service/types";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FormState, UseFormReset } from "react-hook-form";
import { ZodType } from "zod";

export interface IFormInput {
  id?: string;
  name: string;
  label?: string;
  type: TFieldTypes;
  textInputProp?: Record<string, any>;
  selectProp?: Record<string, any>;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
  value?: string | string[];
  leftContent?: string | ReactNode;
  handleSelect?: (selected?: string) => void;
  fieldName?: string;
  optionsLoading?: boolean;
  optionsErrorMsg?: string;
  fileName?: string;
  fileType?: string;
  fileLink?: string;
  fileSize?: string;
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: IFormInput[];
  onFormSubmit: ({ values, reset }: { values: any; reset: UseFormReset<any> }) => void;
  defaultValues?: Record<string, any>;
  formSchema?: ZodType<any, any, any>;
  watchValues?: (values: { [key: string]: string | string[] }) => void;
  // selectedPerson?: number | null;
  disableAll?: boolean;
  formClassName?: string;
  className?: string;
  setFormState?: Dispatch<SetStateAction<FormState<any>>>;
}
