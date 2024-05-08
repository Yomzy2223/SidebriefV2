import { TFieldTypes } from "@/services/service/types";
import { Checkbox, Radio, TextInput } from "flowbite-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

const ListOptions = ({
  name,
  options,
  type,
  allowOther,
  defaultValue,
  setValue,
  errorMsg,
}: {
  name: string;
  options?: string[];
  type: TFieldTypes;
  allowOther?: boolean;
  defaultValue?: string | string[];
  setValue: UseFormSetValue<any>;
  errorMsg?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const isRadio = type === "multiple choice";

  const handleChange = (e: ChangeEvent<HTMLInputElement>, option: string) => {
    const checked = e.target.checked;
    if (isRadio) {
      setValue(name, checked ? option : "");
      setRadioValue(option);
      return;
    }
    let newValues = checkboxValues.filter((el) => options?.find((each) => each === el));
    newValues = checked ? [...newValues, option] : newValues?.filter((el) => el !== option);
    setCheckboxValues(newValues);
    setValue(name, newValues);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [open]);

  // Populate existing values
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
      if (isRadio) {
        if (typeof defaultValue !== "string") return;
        if (options?.find((el) => el === defaultValue)) {
          setRadioValue(defaultValue);
          return;
        }
        setOpen(true);
        setInputValue(defaultValue);
      } else {
        if (typeof defaultValue === "string") return;
        setCheckboxValues(defaultValue);
        defaultValue?.forEach((el) => {
          if (!options?.find((each) => each === el)) {
            setOpen(true);
            setInputValue(el);
          }
        });
      }
    }
  }, [defaultValue]);

  return (
    <div className="flex flex-col gap-2">
      {options?.map((option, i) => (
        <div key={option} className="flex items-center gap-2">
          {type === "multiple choice" && (
            <Radio
              id={name + i}
              name={name}
              checked={radioValue === option}
              onChange={(e) => {
                setOpen(false);
                handleChange(e, option);
              }}
            />
          )}
          {type === "checkbox" && (
            <Checkbox
              id={name + i}
              onChange={(e) => handleChange(e, option)}
              checked={!!checkboxValues.find((el) => el === option)}
            />
          )}

          <label htmlFor={name + i} className="text-sm text-foreground-5">
            {option}
          </label>
        </div>
      ))}
      {allowOther && (
        <div className="flex items-center gap-2">
          {type === "multiple choice" && (
            <Radio
              id={name + options?.length}
              name={name}
              checked={open}
              onChange={(e) => {
                setOpen(true);
                handleChange(e, inputValue);
              }}
            />
          )}
          {type === "checkbox" && (
            <Checkbox
              id={name + options?.length}
              checked={open}
              onChange={(e) => {
                setOpen(!open);
                handleChange(e, inputValue);
              }}
            />
          )}
          {open ? (
            <TextInput
              ref={inputRef}
              type="text"
              value={inputValue}
              placeholder="Enter option"
              onChange={(e) => {
                setValue(name, isRadio ? e.target.value : [...checkboxValues, e.target.value]);
                setInputValue(e.target.value);
              }}
              className="h-5 [&_input]:p-0 [&_input]:border-0 [&_input]:outline-none [&_input]:bg-transparent [&_input]:rounded-none focus:[&_input]:border-b focus:[&_input]:ring-0 [&_input]:!border-border w-full"
            />
          ) : (
            <label htmlFor={name + options?.length} className="text-sm text-foreground-5">
              Other
            </label>
          )}
        </div>
      )}
      {errorMsg && <p className="text-sm text-destructive-foreground mt-1">{errorMsg}</p>}
    </div>
  );
};

export default ListOptions;
