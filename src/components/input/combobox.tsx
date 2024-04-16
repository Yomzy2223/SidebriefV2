"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, Label } from "@/components/flowbite";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { ThreeDots } from "react-loading-icons";
import { ScrollArea } from "../ui/scroll-area";

export function Combobox({
  placeholder,
  options,
  selectValue,
  label,
  isLoading = false,
  value,
  error,
}: {
  placeholder?: string;
  options: string[];
  label?: string;
  selectValue: (value: string) => void;
  isLoading?: boolean;
  value?: string | number;
  error?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="space-y-2 flex flex-col w-full">
          {label ? <Label value={label} /> : null}
          <Button
            color={"input"}
            role="combobox"
            aria-expanded={open}
            className="w-full"
            // outline={!!error}
          >
            <div className="flex w-full justify-between capitalize">
              {value || placeholder || "Select an option..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white" align="start">
        <Command className="">
          {isLoading ? (
            <ThreeDots fill="#00A2D4" />
          ) : (
            <>
              <CommandInput placeholder="Search options..." />
              <CommandEmpty>No Option found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-full max-h-[500px]">
                  {options.map((option, i) => (
                    <CommandItem
                      key={i}
                      value={option}
                      onSelect={(currentValue) => {
                        selectValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      {option}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
