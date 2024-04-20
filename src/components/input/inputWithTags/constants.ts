import { HTMLAttributes } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface IProps {
  size?: string;
  textInputProp?: HTMLAttributes<HTMLInputElement>;
  maxTag?: number;
  minTagChars: number;
  handleKeyDown: (tags: string[]) => void;
  errors?: {
    empty?: string;
    length?: string;
    exists?: string;
    minTagChars?: string;
  };
  submitErr?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  defaultTags?: string[];
  disabled?: boolean;
}
