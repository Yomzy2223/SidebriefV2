"use client";

import { cn } from "@/lib/utils";
import { useLaunchSteps } from "./actions";
import { BadgeCheck } from "@/assets/svg";
import Image from "next/image";
import { Button, Timeline } from "flowbite-react";

export const LaunchStepper = () => {
  const { requestSteps, progress, handleClick, activePage } = useLaunchSteps();

  const activeRoute = activePage ? "/" + activePage?.toLowerCase() : "/";
  return (
    <>
      {/* Mobile stepper */}
      <ol className="flex flex-wrap md:hidden items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 sm:space-x-4 rtl:space-x-reverse">
        {requestSteps.map((el, i, arr) => (
          <Button
            key={el.name}
            color="transparent"
            size="fit"
            onClick={() => handleClick(i, el.route)}
            disabled={i > progress}
          >
            <li
              className={cn("flex gap-3 sm:gap-[18px] items-center font-medium", {
                "text-blue-600 dark:text-blue-500": progress >= i,
                "font-bold": activeRoute === el.route,
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
      <Timeline className="hidden md:block">
        {requestSteps.map((el, i) => (
          <Timeline.Item key={el.name}>
            <Timeline.Point icon={el.Icon} />

            <Button
              size="fit"
              color="transparent"
              onClick={() => handleClick(i, el.route)}
              disabled={i > progress}
            >
              <Timeline.Content>
                <Timeline.Title
                  className={cn(
                    "text-base text-start leading-tight font-medium text-foreground-5",
                    { "font-bold text-foreground-3": activeRoute === el.route }
                  )}
                >
                  {el.name}
                </Timeline.Title>
                <Timeline.Body
                  className={cn("text-xs font-normal text-foreground-5", {
                    "font-semibold": activeRoute === el.route,
                  })}
                >
                  {el.description}
                </Timeline.Body>
              </Timeline.Content>
            </Button>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
