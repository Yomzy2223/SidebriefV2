"use client";

import { Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";

export const Proprietor = ({
  proprietors = [
    {
      name: "Sayo Oluwole",
      email: "Sayoluwole@gmail.com",
      initial: "SO",
      type: "shareholder",
    },
    {
      name: "Sayo Oluwole",
      email: "Sayoluwole@gmail.com",
      initial: "SO",
      type: "shareholder",
    },
    {
      name: "Sayo Oluwole",
      email: "Sayoluwole@gmail.com",
      initial: "SO",
      type: "shareholder",
    },
    {
      name: "Sayo Oluwole",
      email: "Sayoluwole@gmail.com",
      initial: "SO",
      type: "shareholder",
    },
  ],
}: {
  proprietors: ProprietorType[];
}) => {
  return (
    <div className="px-4 pl-7 flex flex-col gap-5">
      <p>you have {proprietors.length} proprietors</p>
      <div className="space-y-4">
        {proprietors.map((el, i) => (
          <div key={i} className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-[50px] w-[50px] rounded-full bg-primary grid place-items-center">
                <p className="text-white font-semibold text-xs leading-normal">{el.initial}</p>
              </div>
              <div className="">
                <p className="leading-normal text-gray-900 font-medium">{el.name}</p>
                <span className="leading-normal text-gray-500 text-sm">{el.email}</span>
              </div>
            </div>
            <Badge icon={SwatchBook} color={"green"}>
              {el.type}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

type ProprietorType = {
  name: string;
  email: string;
  type: string;
  initial: string;
};
