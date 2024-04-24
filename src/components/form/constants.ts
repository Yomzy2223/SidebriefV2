import { ReactNode } from "react";
import { UseFormReset } from "react-hook-form";
import { ZodType } from "zod";

export interface FormInput {
  id?: string;
  name: string;
  label?: string;
  type: string;
  textInputProp?: Record<string, any>;
  selectProp?: Record<string, any>;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
  value?: string | string[];
}

export interface DynamicFormProps {
  children?: ReactNode;
  formInfo: FormInput[];
  onFormSubmit: (values: any) => void;
  defaultValues?: Record<string, any>;
  formSchema?: ZodType<any, any, any>;
  watchValues?: (values: { [key: string]: string | string[] }) => void;
  // selectedPerson?: number | null;
  resetForm?: (reset: UseFormReset<any>) => void;
  disabled?: boolean;
}
