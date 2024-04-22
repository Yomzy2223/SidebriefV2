import { cn } from "@/lib/utils";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

const TextWithDetails = ({
  title,
  list,
  text,
  textClassName,
}: {
  title: string;
  list?: string[];
  text?: string;
  textClassName?: string;
}) => {
  return (
    <div>
      <p className="text-base font-normal text-foreground-9">{title}</p>

      {text && (
        <p className={cn("text-base font-normal text-foreground-5 mt-1 max-w-max", textClassName)}>
          {text}
        </p>
      )}

      {list && (
        <div className="flex flex-wrap gap-4 mt-2">
          {list.map((el) => (
            <p
              key={el}
              className="bg-foreground-1 text-base font-normal text-foreground-5 rounded-md px-[10px] py-1 w-max"
            >
              {el}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextWithDetails;
