import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UseFormSetValue } from "react-hook-form";
import ComboContent from "./content";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { ChevronDown } from "lucide-react";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";

const ComboBox = ({
  name,
  placeholder,
  options,
  selectProp,
  handleSelect,
  setValue,
  errorMsg,
  fieldName,
  leftContent,
  defaultValue,
  disabled,
  optionsLoading,
  optionsErrorMsg,
  isMultiCombo,
  className,
}: IProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(defaultValue);

  // console.log(defaultValue, selectValue);
  const findOriginalValue = (value: string) =>
    options.find((el) => el.toLowerCase() === value.toLowerCase()) || "";

  useEffect(() => {
    if (defaultValue) setSelectValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <PopOverWrapper
        open={openSelect}
        setOpen={setOpenSelect}
        onClose={() => setOpenSelect(false)}
        className="p-1"
        content={
          <ComboContent
            name={name}
            options={options}
            handleSelect={handleSelect}
            setValue={setValue}
            fieldName={fieldName}
            optionsLoading={optionsLoading}
            optionsErrorMsg={optionsErrorMsg}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            setOpenSelect={setOpenSelect}
            findOriginalValue={findOriginalValue}
          />
        }
      >
        <Button
          outline
          role="combobox"
          className={cn(
            "w-full [&_span]:justify-between [&>span]:!p-2.5",
            {
              "border-primary ring-primary ring-1": openSelect && !isMultiCombo,
              "[&_span]:rounded-none rounded-none border-none bg-transparent": isMultiCombo,
            },
            className
          )}
          disabled={disabled}
          {...selectProp}
        >
          {selectValue ? (
            <div className="flex gap-1">
              {leftContent && leftContent}
              <span>{findOriginalValue(selectValue)}</span>
            </div>
          ) : optionsLoading ? (
            "Loading..."
          ) : (
            placeholder || "Select " + (fieldName || name)
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopOverWrapper>
      {errorMsg && <p className="text-sm text-destructive-foreground mt-1">{errorMsg}</p>}
    </>
  );
};
export default ComboBox;

interface IProps {
  name?: string;
  placeholder?: string;
  options: string[];
  selectProp?: HTMLAttributes<HTMLButtonElement>;
  handleSelect?: (selected?: string) => void;
  setValue?: UseFormSetValue<any>;
  errorMsg?: string;
  fieldName?: string;
  leftContent?: string | ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  optionsLoading?: boolean;
  optionsErrorMsg?: string;
  isMultiCombo?: boolean;
  className?: string;
}
