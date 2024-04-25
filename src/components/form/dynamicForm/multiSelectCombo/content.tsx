import React, { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";

const Content = ({
  name,
  options,
  fieldName,
  optionsLoading,
  selectedTags,
  setSelectedTags,
  setValue,
  selectProp,
}: IContentProps) => {
  const findOriginalValue = (values: string[]) =>
    values.map((el) => options.find((each) => each.toLowerCase() === el.toLowerCase()) as string);

  const removeTag = (option: string) => {
    let tagsCopy = [...selectedTags];
    tagsCopy = tagsCopy.filter((el) => el.toLowerCase() !== option.toLowerCase());
    setSelectedTags(tagsCopy);
    setValue("options", tagsCopy);
  };

  const onSelect = (selected: string) => {
    let isPresent = !!selectedTags.find((el) => el === selected);
    let options = [...selectedTags];
    if (isPresent) {
      options = options.filter((el) => el !== selected); //deselect
    } else {
      options = selectedTags ? [...options, selected] : [...options]; //select
    }
    options = [...new Set(options)]; //Remove duplicates
    setValue && setValue(name, options, { shouldValidate: true });
    setSelectedTags(options);
    selectProp?.onSelect && selectProp?.onSelect(findOriginalValue(options));
  };

  return (
    <>
      <Command className="min-w-[160px] md:max-w-[400px] max-h-96 overflow-auto">
        {options.length > 5 && (
          <CommandInput
            placeholder={`Search ${fieldName || name}...`}
            className="sticky top-0 my-3 border-input"
          />
        )}
        {!optionsLoading && options.length === 0 && (
          <p className="text-sm text-foreground-5 p-2 pb-0">{`No ${fieldName || name} found`}</p>
        )}
        <CommandGroup className="h-full overflow-auto">
          {optionsLoading && (
            <div className="space-y-1">
              <Skeleton className="w-40 h-6" />
              <Skeleton className="w-40 h-6" />
              <Skeleton className="w-40 h-6" />
            </div>
          )}
          {options.map((option) => (
            <CommandItem key={option} value={option} onSelect={onSelect}>
              <Check
                className={cn("mr-2 h-4 w-4 opacity-0 shrink-0", {
                  "opacity-100": selectedTags.find(
                    (el) => el.toLowerCase() === option.toLowerCase()
                  ),
                })}
              />
              {option}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
      {selectedTags?.length > 0 && (
        <div className="hidden overflow-auto max-h-96 max-w-[250px] pr-2 md:block">
          <h3 className="py-1.5 border-b border-border font-semibold sticky top-0 bg-white">
            Selected ({selectedTags?.length || 0})
          </h3>
          <ul className="flex flex-col gap-1 max-w-80">
            {findOriginalValue(selectedTags)?.map((tag) => (
              <li key={tag} className="flex justify-between items-start gap-1 text-sm p-1 pl-0">
                {tag}
                <Button size="fit" color="ghost" onClick={() => removeTag(tag)}>
                  <X size={14} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Content;

interface IContentProps {
  name: string;
  options: string[];
  selectProp?: Record<any, any>;
  setValue: UseFormSetValue<any>;
  fieldName?: string;
  optionsLoading?: boolean;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}
