"use client";

import MemberCard from "./MemberCard";

export const Proprietor = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm">you have {proprietors.length} proprietors</p>
      <div
        className="space-y-4 max-h-[400px] overflow-auto"
        // whileHover={{ overflow: "auto" }}
      >
        {proprietors.map((el, i) => (
          <MemberCard info={el} />
        ))}
      </div>
    </div>
  );
};

const proprietors: ProprietorType[] = [
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
];

type ProprietorType = {
  name: string;
  email: string;
  type: string;
  initial: string;
};
