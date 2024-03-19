import { Badge, Button } from "@/components/flowbite";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { ArrowRightCircle, ChevronDown, Info } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const BusinessInfoSecion = () => {
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);

  const handleSelect = (selected?: string) => {
    selected && setSelectedBusiness(selected);
  };

  return (
    <div className="flex flex-col gap-12 md:justify-between md:flex-row md:gap-3">
      <div className="text-foreground-3">
        <div className="flex items-center gap-4 mb-2.5">
          <PopOverWrapper
            open={open}
            setOpen={setOpen}
            onClose={() => console.log("Closed")}
            content={
              <BusinessList businesses={businesses} handleSelect={handleSelect} setOpen={setOpen} />
            }
          >
            <Button color="ghost" size="fit" className="text-start [&>span]:justify-start ">
              <h2 className="sb-text-24 font-bold whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] sm:max-w-[400px] lg:max-w-[500px] 2xl:max-w-[800px]">
                {selectedBusiness}
              </h2>
              <ChevronDown />
            </Button>
          </PopOverWrapper>
          <Badge
            icon={() => <Info size={10} className="shrink-0" />}
            color="yellow"
            className="hidden px-2.5 py-0.5 rounded-md text-xs font-normal min-[350px]:flex"
          >
            My business
          </Badge>
        </div>
        <p className="sb-text-18 mb-3">Nō 22 Alamala Rd., Ajanlekoko, Lagos</p>
        <div className="flex items-center gap-2">
          <Badge color="green" className="sb-text-14">
            Completed
          </Badge>
          <span className="sb-text-14">12th August, 2022</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row md:items-center md:gap-7">
        <Button outline className="border-foreground">
          <span>Manage this business</span>
          <ArrowRightCircle fill="hsl(var(--foreground))" stroke="white" />
        </Button>
        <Button color="secondary">
          <span>Register new business</span>{" "}
          <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
        </Button>
      </div>
    </div>
  );
};

export default BusinessInfoSecion;

export const BusinessList = ({
  businesses,
  handleSelect,
  setOpen,
}: {
  businesses: string[];
  handleSelect: (selected?: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Command>
      {businesses.length > 10 && <CommandInput placeholder="Filter status..." />}
      <CommandList>
        {businesses?.length === 0 && (
          <div className="text-foreground-5 text-sm p-2 pb-0">No business found</div>
        )}
        <CommandGroup>
          {businesses
            .sort((a, b) => a.localeCompare(b))
            .map((item: string) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={(value) => {
                  handleSelect(
                    [...businesses].find(
                      (each: string) => each.toLowerCase() === value.toLowerCase()
                    )
                  );
                  setOpen(false);
                }}
                // className="text-foreground-7 capitalize"
              >
                {item}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

const businesses = ["Lola", "Ayomide Construction", "Folagbade & Sons construction company"];
