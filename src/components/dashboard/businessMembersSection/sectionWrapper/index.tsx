import { Card } from "@/components/flowbite";
import { ReactNode } from "react";
import { LightOutlineArrow } from "@/assets/icons";
import Link from "next/link";

export const SectionWrapper = ({
  children,
  title,
  morelink,
}: {
  children: ReactNode;
  title: string;
  morelink: string;
}) => {
  return (
    <div className="min-w-0 shadow-md rounded-lg flex-1">
      <div className="flex justify-between pt-7 pb-4 pr-4 pl-6">
        <h5 className="text-lg font-semibold leading-normal">{title}</h5>
        <Link href={morelink || ""}>
          <LightOutlineArrow />
        </Link>
      </div>
      {children}
    </div>
  );
};
