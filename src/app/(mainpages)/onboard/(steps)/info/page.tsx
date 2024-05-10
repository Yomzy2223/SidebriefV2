"use client"
import React from 'react'
import DynamicForm from "@/components/form/dynamicForm";
import { useCountryApi } from "@/hooks/useCountryApi";
// import { CountryTypes } from "@/types/type";
import { Button } from "flowbite-react";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import * as z from "zod";
import { IFormInput } from "@/components/form/constants";
import { useRouter } from "next/navigation";
import Link from "next/link"

const OnboardInfo = () => {
  const handleSubmit = () => {}
  
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  }
  return (
      <div className="px-12">
          <div className="flex flex-col mb-8">
              <h4 className="text-sm leading-normal text-foreground-3 mb-1">Personal Profile</h4>
              <h6 className="text-2xl leading-normal font-semibold text-primary">Your profile is also required</h6>
          </div>
          <DynamicForm formInfo={formInfo} onFormSubmit={handleSubmit} defaultValues={defaultValues}>
          
          <div className="flex justify-between mt-7 md:mt-9">
            
            <Button
                  color="plain"
                  size="fit"
                  className="text-destructive-foreground"
                  onClick={goBack}
                >
                <div className="space-x-2 flex items-center" >
                    <p>Go Back</p>
                    {true && <ArrowRightCircle className="ml-1" />}
                </div>
            </Button>
              
            <Link href="/onboard/doc">
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
          

          </DynamicForm>
        </div>
  )
}

export default OnboardInfo

const formInfo: IFormInput[] = [
    {
      name: "name",
      label: "Full name of contact  person",
      type: "text",
      textInputProp: {
        placeholder: "Enter your full name here",
      },
    },
    {
        name: "email",
        label: "E-mail of contact  person",
        type: "email",
        textInputProp: {
          placeholder: "Enter your email here",
        },
      },
    
    {
      name: "number",
      label: "Phone numbe of the contact person",
      type: "text",
      textInputProp: {
        placeholder: "Enter phone number",
      },
    },    
];
  
  const formSchema = z.object({
      name: z.string().min(1, { message: "Enter your name" }),
      email: z.string().min(1, { message: "Enter your email" }),
      number:  z.string().min(1, { message: "Enter your number" }),
     
    });
    

  type signUpType = z.infer<typeof formSchema>;
  
    
  const defaultValues = {
    name: "",
    emai: "",
    number: "",
  };
  