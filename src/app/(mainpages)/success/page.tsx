"use client";
import React from "react";
import Image from "next/image";
import { SuccessImage } from "@/assets/images";
// import { ConfettiDesign } from '@/lib/utils'

const page = () => {
  // useEffect(() => {
  //     ConfettiDesign()
  // }, [])
  return (
    <>
      <div className="px-6 py-12 sm:py-12 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center">
            <Image src={SuccessImage} quality={100} alt="" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-dark sm:text-6xl">
            Registration Completed
          </h2>
          <h4 className="mt-6 text-lg leading-8 text-dark-300">
            You will get your document in no time.
          </h4>
          <h4 className="mt-0 text-lg leading-8 text-dark-300">Thank you for using Sidebrief.</h4>
        </div>
      </div>
    </>
  );
};

export default page;
