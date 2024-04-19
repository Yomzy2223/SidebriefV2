import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Label, Radio } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  queryNav: { name: string; value: string }[];
  defaultActive?: number;
  variant?: number;
}

const QueryNav2 = ({ queryNav, defaultActive = 0, variant }: IProps) => {
  const { setQuery } = useGlobalFunctions();

  const searchParams = useSearchParams();

  return (
    <div className="flex items-center flex-wrap gap-3 md:gap-4">
      {queryNav.map((el, i) => {
        let isActive =
          i === defaultActive
            ? !searchParams.get(el.name) || el.value === searchParams.get(el.name)
            : el.value === searchParams.get(el.name);

        return (
          <div key={el.value} className="flex items-center cursor-pointer">
            <Radio
              id={el.value}
              name={el.name}
              checked={isActive}
              onChange={() => setQuery(el.name, el.value)}
              className="cursor-pointer"
            />
            <Label
              htmlFor={el.value}
              className="text-sm font-normal first-letter:uppercase cursor-pointer pl-2"
            >
              {el.value}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default QueryNav2;
