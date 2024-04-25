import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";
import { Button } from "flowbite-react";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import Content from "./content";

// A combo box to select multiple options
const MultiSelectCombo = ({
  name,
  options,
  selectProp,
  setValue,
  errorMsg,
  fieldName,
  defaultTags,
  disabled,
  optionsLoading,
}: IProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultTags || []);

  useEffect(() => {
    if (defaultTags) setSelectedTags(defaultTags);
  }, [defaultTags]);

  return (
    <>
      <PopOverWrapper
        open={openSelect}
        setOpen={setOpenSelect}
        onClose={() => setOpenSelect(false)}
        className="flex gap-4 w-full p-1"
        big
        content={
          <Content
            name={name}
            options={options}
            fieldName={fieldName}
            optionsLoading={optionsLoading}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setValue={setValue}
            selectProp={selectProp}
          />
        }
      >
        <Button
          outline
          role="combobox"
          className={cn("w-full [&_span]:justify-between [&>span]:!p-2.5", {
            "border-primary ring-primary ring-1": openSelect,
          })}
          disabled={disabled}
          {...selectProp}
        >
          {selectedTags?.length > 0 ? (
            <div className="flex gap-1">
              {(selectedTags?.length || 0) + " " + (fieldName || name)} selected
            </div>
          ) : (
            selectProp?.placeholder || "Select " + (fieldName || name)
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopOverWrapper>
      {errorMsg && <p className="text-sm text-destructive-foreground mt-1">{errorMsg}</p>}
    </>
  );
};
export default MultiSelectCombo;

interface IProps {
  name: string;
  options: string[];
  selectProp?: Record<any, any>;
  setValue: UseFormSetValue<any>;
  errorMsg?: string;
  fieldName?: string;
  defaultTags?: string[];
  disabled?: boolean;
  optionsLoading?: boolean;
}
