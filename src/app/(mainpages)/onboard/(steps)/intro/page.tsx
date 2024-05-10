import React from 'react'
import { Button } from "flowbite-react";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

const OnboardIntro = () => {
  return (
        <div className="px-12">
        <div className="flex flex-col mb-8">
            <h2 className="text-2xl md:text-4xl leading-normal text-foreground-3 text-black-500 font-bold mb-1">Hi Joshua, I’m Declan</h2>
            <p className="text-lg pt-4 max-w-4xl">
            We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick Innovators and problem solvers. Small enough to be simple and quick Innovators and problem solvers. Small enough to be simple and quick Innovators and problem solvers. Small enough to be simple and quick.
            </p>

            <div className='mt-4'>
                <h6 className="text-lg leading-normal font-semibold text-primary">Documents you will need to provide</h6>

                <div className='my-4'>
                    <ul className="list-none space-y-1 md:grid md:grid-cols-4 md:gap-2">
                        <li>Document One</li>
                        <li>Document Two</li>
                        <li>Document Three</li>
                        <li>Document Four</li>
                        <li>Document Five</li>
                        <li>Document Six</li>
                    </ul>
                </div>

                <Link href="/onboard/profile">
                    <Button
                        color="secondary"
                        size={"lg"}
                        type="submit"
                        isProcessing={false}
                        disabled={false}
                        processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
                        >
                        <div className="space-x-2 flex items-center">
                            <p>Continue</p>
                            {true && <ArrowRightCircle className="ml-1" />}
                        </div>
                    </Button>

                    
                </Link>
                

            </div>
        </div>
    </div>
   
  )
}

export default OnboardIntro