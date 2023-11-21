"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { Itestimonial } from "./constants";

interface testimonialCardProps extends Itestimonial {}

export const TestimonialCard = ({
  description,
  image,
  name,
  position,
  title,
}: testimonialCardProps) => {
  return (
    <Card href="#" className="border-0 bg-white/10 rounded-2xl">
      <h3>
        <h4 className="text-2xl text-white leading-[1.3]">{title}</h4>
      </h3>
      <div className="pb-10">
        <p className="text-base text-white leading-[1.3]">{description}</p>
      </div>
      <p>
        <div className="flex gap-2">
          <Image src={image} alt="user" />
          <div className="flex flex-col justify-center gap-2">
            <p className="text-base font-semibold text-white leading-[1.3]">
              {name}
            </p>
            <p className="text-sm leading-[1.3] text-white">{position}</p>
          </div>
        </div>
      </p>
    </Card>
  );
};
