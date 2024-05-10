"use client"
import React from 'react'
import DynamicForm from "@/components/form/dynamicForm";
import { useCountryApi } from "@/hooks/useCountryApi";
// import { CountryTypes } from "@/types/type";
import { Button } from "flowbite-react";
import { Oval } from "react-loading-icons";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import * as z from "zod";
import { IFormInput } from "@/components/form/constants";
import Link from "next/link"
import { useRouter } from "next/navigation";
const OnboardProfile = () => {

  const { getAllCountriesQuery } = useCountryApi();
  const { data, isLoading } = getAllCountriesQuery;
  const countriesData = data?.data?.data;

  const handleSubmit = () => {}

  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  return (
    <div className="px-12 max-w-6xl">
       <div className="flex flex-col mb-8">
            <h4 className="text-sm leading-normal text-foreground-3 mb-1">Business Profile</h4>
            <h6 className="text-2xl leading-normal font-semibold text-primary">Give us the Business face</h6>
        </div>
        <DynamicForm 
          formInfo={formInfos} 
          onFormSubmit={handleSubmit} 
          defaultValues={defaultValues} 
          formSchema={signUpSchema}
        >

           <div className="flex justify-between mt-7 md:mt-9">
                <Button
                     color="plain"
                     size="fit"
                     className="text-destructive-foreground"
                     onClick={goBack}
                    >
                    <div className="space-x-2 flex items-center">
                        <p>Go Back</p>
                        {true && <ArrowRightCircle className="ml-1" />}
                    </div>
                </Button>

                <Link href="/onboard/info">
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
          {/* <Link href="/onboard/info">
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
          </Link> */}
            
        </DynamicForm>
        
    </div>
  )
}

export default OnboardProfile

const formInfos: IFormInput[] = [
  {
    name: "name",
    label: "Tell us the name of the company",
    type: "text",
    textInputProp: {
      placeholder: "Enter your Business name here",
    },
  },
  {
    name: "country",
    label: "Jurisdiction registered or Country of Registration",
    type: "select",
    selectProp: {
      placeholder: "Select a country",
    },
    // options: countriesData,
    options: ["Nigeria", "Kenya", "South Africa"],

  },
  {
    name: "organization",
    label: "Registration Number",
    type: "text",
    textInputProp: {
      placeholder: "Enter registration Number",
    },
  },
  

  
];
const formSchema = z.object({
  name: z.string().min(1, { message: "Enter your business name" }),
  country: z.string().min(1, { message: "Select a Country" }),
  organization:  z.string().min(1, { message: "Enter your organization name" }),
  
});
  


const signUpSchema = z.object({
  name: z.string().min(1, { message: "Enter your business name" }),
  country: z.string().min(1, { message: "Select a Country" }),
  organization:  z.string().min(1, { message: "Enter your organization name" }),
});

type signUpType = z.infer<typeof formSchema>;

  
const defaultValues = {
  name: "",
  country: "",
  organization: "",
};
