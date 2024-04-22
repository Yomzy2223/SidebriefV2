"use client";

import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  queryNav: { name: string; value: string }[];
  defaultActive?: number;
}

const QueryNav3 = ({ queryNav, defaultActive = 0 }: IProps) => {
  const { setQuery } = useGlobalFunctions();

  const searchParams = useSearchParams();

  return (
    <div className="flex gap-3 capitalize">
      {queryNav.map((el, i) => {
        let isActive =
          i === defaultActive
            ? !searchParams.get(el.name) || el.value === searchParams.get(el.name)
            : el.value === searchParams.get(el.name);

        return (
          <Button
            size="ft"
            color="ghost"
            key={el.value}
            onClick={() => setQuery(el.name, el.value)}
            className={cn(
              "bg-success text-success-foreground text-xs font-normal px-2.5 py-0.5 capitalize",
              {
                "opacity-100": isActive,
                "opacity-30": !isActive,
              }
            )}
          >
            {el.value}
          </Button>
        );
      })}
    </div>
  );
};

export default QueryNav3;
