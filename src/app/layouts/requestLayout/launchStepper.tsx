"use client";

import { cn } from "@/lib/utils";
import { useLaunchSteps } from "./actions";
import { BadgeCheck } from "@/assets/svg";
import Image from "next/image";
import { Button } from "flowbite-react";

export const LaunchStepper = () => {
  const { launchSteps, progress, handleClick } = useLaunchSteps();

  return (
    <>
      {/* Mobile stepper */}
      <ol className="flex flex-wrap md:hidden items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 sm:space-x-4 rtl:space-x-reverse">
        {launchSteps.map((el, i, arr) => (
          <Button
            color="transparent"
            size="fit"
            key={i}
            onClick={() => handleClick(i, el.route)}
            disabled={i > progress}
          >
            <li
              className={cn("flex gap-3 sm:gap-[18px] items-center", {
                "text-blue-600 dark:text-blue-500": progress >= i,
              })}
            >
              <div className="flex gap-1.5">
                {progress >= i ? <Image src={BadgeCheck} alt="" /> : null}
                {el.name}
              </div>
              {arr.length !== i ? <span> / </span> : null}
            </li>
          </Button>
        ))}
      </ol>
      {/* Desktop stepper */}
      <ol className="hidden relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 md:flex md:flex-col">
        {launchSteps.map((el, i) => (
          <Button
            color="transparent"
            size="fit"
            key={i}
            onClick={() => handleClick(i, el.route)}
            disabled={i > progress}
          >
            <li className="mb-10 ms-6">
              <span
                className={cn(
                  "absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700",
                  {
                    "bg-yellow-100 dark:bg-yellow-900": progress >= i,
                  }
                )}
              >
                <div
                  className={cn("text-primary dark:text-primary", {
                    "text-gray-500": !(progress >= i),
                  })}
                >
                  <el.Icon className="w-4 h-4" />
                </div>
              </span>
              <h3 className="font-medium leading-tight">{el.name}</h3>
              {/* <p className="text-sm">{el.description}</p> */}
            </li>
          </Button>
        ))}
      </ol>
    </>
  );
};
