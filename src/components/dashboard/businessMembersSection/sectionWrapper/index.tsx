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
  morelink?: string;
}) => {
  return (
    <div className="flex flex-col gap-3 flex-1 shadow-md rounded-lg p-4 pt-6 max-w-[700px] lg:min-w-[450px]">
      <div className="flex justify-between">
        <h5 className="sb-text-18 font-semibold leading-normal">{title}</h5>
        {morelink && (
          <Link href={morelink || ""}>
            <LightOutlineArrow />
          </Link>
        )}
      </div>

      {children}
    </div>
  );
};
