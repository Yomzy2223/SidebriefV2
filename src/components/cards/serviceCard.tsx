import { cn } from "@/lib/utils";
import { Button } from "flowbite-react";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface propTypes {
  icon: any;
  name: string;
  description: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ServiceCard = ({
  icon,
  name,
  description,
  active,
  onClick,
}: propTypes) => {
  return (
    <Button
      className={cn(" shadow", {
        "bg-card": active,
      })}
      onClick={onClick}
      color="plain"
    >
      <div className="flex flex-col items-start px-1 py-2">
        <div className="bg-[#FBFFD1A3] rounded-full w-max px-2 py-1 mb-2">
          <Image src={icon} alt={name} />
        </div>
        <h2 className="text-sm mb-1 font-semibold text-start">{name}</h2>
        <p className="text-xs text-foreground-3 text-start">{description}</p>
      </div>
    </Button>
  );
};

export default ServiceCard;
