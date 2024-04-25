import React, { Dispatch, SetStateAction } from "react";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { UseFormSetValue } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ComboContent = ({
  name,
  options,
  handleSelect,
  setValue,
  fieldName,
  optionsLoading,
  optionsErrorMsg,
  selectValue,
  setSelectValue,
  setOpenSelect,
  findOriginalValue,
}: IContentProps) => {
  return (
    <Command className="min-w-40">
      {options.length > 10 && <CommandInput placeholder={`Search ${fieldName}...`} />}
      {!optionsLoading && options.length === 0 && (
        <p
          className={cn("text-sm text-foreground-5 p-2 pb-0", {
            "text-destructive-foreground": optionsErrorMsg,
          })}
        >
          {optionsErrorMsg || `No ${fieldName || name} found`}
        </p>
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
              const selected = currentValue === selectValue ? "" : currentValue;
              setSelectValue(selected);
              setValue && name && setValue(name, selected, { shouldValidate: true });
              setOpenSelect(false);
              handleSelect && handleSelect(findOriginalValue(selected));
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectValue === option.toLowerCase() ? "opacity-100" : "opacity-0"
              )}
            />
            {option}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};

export default ComboContent;

interface IContentProps {
  name?: string;
  options: string[];
  handleSelect?: (selected?: string) => void;
  setValue?: UseFormSetValue<any>;
  fieldName?: string;
  optionsLoading?: boolean;
  optionsErrorMsg?: string;
  findOriginalValue: (value: string) => string;
  selectValue?: string;
  setSelectValue: Dispatch<SetStateAction<string | undefined>>;
  setOpenSelect: Dispatch<SetStateAction<boolean>>;
}
