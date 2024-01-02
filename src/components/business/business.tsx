import React from 'react'
import Image from "next/image";
import { BadgeCheck } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { AppliedImage, ApprovedImage, ProgressImage, CompletedImage } from "@/assets/svg";

const dateline = [
	{
		name: "Applied",
		date: "19th Sep, 2019",
		Icon: AppliedImage,
	},
	{
		name: "Approved",
		date: "--------",
		Icon: ApprovedImage,
	},
	{
		name: "In Progress",
		date: "--------",
		Icon: ProgressImage,
	},
	{
		name: "Completed",
		date: "---------",
		Icon: CompletedImage,
	},
];

const DateBar = ({ step = 1 }: { step?: number }) => {
  return (
    
    <>
        {/* Mobile stepper */}
    
        <ol className="flex flex-wrap md:hidden items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 sm:space-x-4 rtl:space-x-reverse">
            {dateline.map((el, i, arr) => (
                <li
                    className={cn("flex gap-3 sm:gap-[18px] items-center", {
                        "text-blue-600 dark:text-blue-500":
                            step === i + 1,
                    })}
                    key={i}
                >
                    <div className="flex gap-1.5">
                        {step === i + 1 ? (
                            <Image src={BadgeCheck} alt="" />
                        ) : null}
                        {el.name}
                    </div>
                    {arr.length !== i + 1 ? <span> / </span> : null}
                </li>
            ))}
        </ol>
        {/* Desktop stepper */}

        
        <ol className="mt-12 mx-2  relative text-gray-500 border-s border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-400 hidden md:block">
            {dateline.map((el, i) => (
                <li className="mb-12 ms-6" key={i}>
                    <span
                        className={cn(
                            "absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700",
                            {
                                "bg-white-100 dark:bg-white-900":
                                    step >= i + 1,
                            }
                        )}
                    >
                        <div
                            className={cn(
                                "text-primary dark:text-primary",
                                {
                                    "text-gray-500": !(step >= i + 1),
                                }
                            )}
                        >
                            {/* <el.Icon className="w-4 h-4" /> */}
                            <Image src={el.Icon} alt="" className="w-4 h-4"/>
                        </div>
                    </span>
                    <h3 className="font-medium leading-tight mt-3">{el.name}</h3>
                    <p className="text-sm pt-2">{el.date}</p>
                </li>
            ))}
        </ol>
    </>
			
  )
}

export default DateBar