import { ReactNode } from "react";
import { UseFormReset } from "react-hook-form";
import { ZodType } from "zod";

export interface IFormInput {
  id?: string;
  name: string;
  label?: string;
  type: string;
  textInputProp?: Record<string, any>;
  selectProp?: Record<string, any>;
  fileProp?: Record<string, any>;
  selectOptions?: string[];
  value?: string | string[];
  leftContent?: string | ReactNode;
  handleSelect?: (selected?: string) => void;
  fieldName?: string;
  optionsLoading?: boolean;
}

export interface DynamicFormProps {
  children: ReactNode;
  formInfo: IFormInput[];
  onFormSubmit: (values: any) => void;
  defaultValues?: Record<string, any>;
  formSchema?: ZodType<any, any, any>;
  watchValues?: (values: { [key: string]: string | string[] }) => void;
  // selectedPerson?: number | null;
  resetForm?: (reset: UseFormReset<any>) => void;
  disableAll?: boolean;
  formClassName?: string;
  className?: string;
}
