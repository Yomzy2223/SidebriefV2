import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

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
  isMultiCombo,
  className,
}: IProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(defaultValue);

  const findOriginalValue = (value: string) =>
    options.find((el) => el.toLowerCase() === value.toLowerCase());

  useEffect(() => {
    if (defaultValue) setSelectValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Popover open={openSelect} onOpenChange={setOpenSelect}>
        <PopoverTrigger asChild className="w-max">
          <Button
            outline
            role="combobox"
            className={cn(
              "w-full [&_span]:justify-between [&>span]:!p-2.5",
              {
                "border-primary ring-primary ring-1":
                  openSelect && !isMultiCombo,
                "[&_span]:rounded-none rounded-none border-none bg-transparent":
                  isMultiCombo,
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
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-96 overflow-y-auto">
          <Command className="min-w-40">
            {options.length > 10 && (
              <CommandInput placeholder={`Search ${fieldName}...`} />
            )}
            {!optionsLoading && options.length === 0 && (
              <p className="text-sm text-foreground-5 p-2 pb-0">{`No ${
                fieldName || name
              } found`}</p>
            )}
            <CommandGroup>
              {optionsLoading && (
                <div className="space-y-1">
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-40 h-6" />
                </div>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    const selected =
                      currentValue === selectValue ? "" : currentValue;
                    setSelectValue(selected);
                    setValue &&
                      name &&
                      setValue(name, selected, { shouldValidate: true });
                    setOpenSelect(false);
                    handleSelect && handleSelect(findOriginalValue(selected));
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectValue === option.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {errorMsg && (
        <p className="text-sm text-destructive-foreground">{errorMsg}</p>
      )}
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
  isMultiCombo?: boolean;
  className?: string;
}
