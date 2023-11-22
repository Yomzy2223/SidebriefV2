"use client";

import { ReactNode } from "react";
import Testimonial from "./testimonial";
import Image from "next/image";
import { SidebriefLogo } from "@/assets/images";

interface authLayoutProps {
  children: ReactNode;
  login?: boolean;
}

export const AuthLayout = ({ children, login }: authLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex justify-center items-center w-3/5">
        <div className="w-4/5 h-[80%]">
          <Image
            src={SidebriefLogo}
            alt="Sidebrief logo"
            width={130}
            height={32}
            className="mb-12 2xl:mb-16"
          />
          {children}
        </div>
      </div>
      <div className="flex items-center justify-center bg-primary bg-authPattern w-2/5">
        <div className="flex flex-col justify-between w-[90%] h-[80%] text-primary-foreground">
          <div className="">
            <h1 className="sb-text-40 font-bold mb-4">
              Quick launch your business without stresss
            </h1>
            <p className="sb-text-24 ">
              Launch your business without stressing on business Launch your
              business without stress.
            </p>
          </div>

          <Testimonial />
        </div>
      </div>
    </div>
  );
};
