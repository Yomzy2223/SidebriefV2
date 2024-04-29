"use client";

import MemberCard from "./MemberCard";
import { useGetRequestFormQA } from "@/services/productQA";

export const Member = () => {
  return (
    <div className="flex flex-col gap-5 max-w-full">
      <p className="text-sm">you have {proprietors.length} proprietors</p>
      <div
        className="space-y-4 max-h-[400px] overflow-auto"
        // whileHover={{ overflow: "auto" }}
      >
        {proprietors.map((el, i) => (
          <MemberCard key={i} info={el} />
        ))}
      </div>
    </div>
  );
};

const proprietors: MemberType[] = [
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
    hasDocs: true,
  },
  {
    name: "Sayo Oluwole",
    email: "Sayoluwole@gmail.com",
    initial: "SO",
    type: "shareholder",
    hasDocs: true,
  },
  {
    name: "Sayo Oluwole",
    email: "Sayoluwole@gmail.com",
    initial: "SO",
    type: "shareholder",
    hasDocs: true,
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

type MemberType = {
  name: string;
  email: string;
  type: string;
  initial: string;
  hasDocs?: boolean;
};
