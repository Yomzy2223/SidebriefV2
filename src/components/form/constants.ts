import { TFieldTypes, TProductForm, TServiceForm, TSubForm } from "@/services/service/types";
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
  placeholder?: string;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
  value?: string | string[];
  leftContent?: string | ReactNode;
  handleSelect?: (selected?: string) => void;
  compulsory?: boolean;
  fieldName?: string;
  optionsLoading?: boolean;
  optionsErrorMsg?: string;
  fileName?: string;
  fileType?: string;
  fileLink?: string;
  fileSize?: string;
  dependsOn?: {
    field: string;
    options: string[];
  };
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: IFormInput[];
  onFormSubmit: ({ values, reset }: { values: any; reset: UseFormReset<any> }) => void;
  defaultValues?: Record<string, any>;
  formSchema?: ZodType<any, any, any>;
  // selectedPerson?: number | null;
  disableAll?: boolean;
  formClassName?: string;
  className?: string;
  fullFormInfo?: TSubForm[];
}
