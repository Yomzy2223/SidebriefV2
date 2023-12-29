"use client"

import { Badge, Button, Checkbox, Datepicker, Label, TextInput } from "@/components/flowbite";
import { BankIcon, CardIcon, CreditCardIcon } from "@/assets/svg";
import { IoCopyOutline } from "react-icons/io5";
import { ArrowRight } from "@/assets/icons";
// import { Tab } from "./Tab";
import Image from "next/image";
import { FlutterwaveIcon, PaystackIcon, RemitaIcon } from "@/assets/images";

export const PaymentOption = () => {
  return (
    <div className="space-y-8">
        <div className="flex justify-between w-full">

            <div className="flex flex-col">
                <h4 className="text-2xl leading-normal font-semibold">
                    Card Payment
                </h4>
                <h2 className="text-md leading-normal font-normal">
                    Select the payment gateway you want to use  
                </h2>
            </div>

            
        </div>

        <div className="flex space-x-12">
            <div className="flex flex-col items-center">
                <Image src ={RemitaIcon} quality={100} alt=""/>
            </div>

            <div className="flex flex-col items-center">
                <Image src ={PaystackIcon} quality={100} alt=""/>
            </div>

            <div className="flex flex-col items-center">
                <Image src ={FlutterwaveIcon} quality={100} alt=""/> 
            </div>
        </div>

        
        {/* <div className="flex flex-col gap-8">
            <div className="space-y-2">
                <Label htmlFor="promo-code" value="Promo Code (Optional) " />
                <TextInput
                    id="Promo Code"
                    placeholder="Guaranty Trust Bank (GTB)"
                    disabled
                />
            </div>
            <div className="space-y-2">
                <Label
                    htmlFor="plan-amount"
                    value="Plan Amount"
                />
                <TextInput
                    id="plan-amount"
                    placeholder="15,000"
                    disabled
                />
            </div>
            

            <div className="space-y-2 w-full">
                <Label
                    htmlFor="bank-name"
                    value="Bank Name"
                />
                <TextInput
                    id="bank-name"
                    placeholder="Guaranty Trust Bank (GTB)"
                    disabled
                />
            </div>

            <div className="flex flex-row">
                <div className="space-x-0">
                    <Label
                        htmlFor="expiry-date"
                        value="Expiry Date"
                    />
                    <Datepicker placeholder="DD - MM - YYYY" color="red"/>
                    <div className="my-2">
                        <div className="flex items-center gap-x-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">
                                Save card information for next billing period
                            </Label>
                        </div>
                    </div>
                    
                </div>

                <div className="space-x-6">
                    <div className="space-x-6">
                        <Label
                            htmlFor="cvv"
                            value="cvv"
                        />
                        <TextInput
                            id="cvv"
                            placeholder="***"
                            readOnly 
                        />
                    </div>
                    
                   
                </div>
            </div>
           
            
        </div> */}

        <div className="flex flex-col gap-8">
            <div className="space-y-2">
                <Label htmlFor="promo-code" value="Promo Code (Optional) " />
                <TextInput
                    id="Promo Code"
                    placeholder="Guaranty Trust Bank (GTB)"
                    disabled
                />
            </div>
            <div className="space-y-2">
                <Label
                    htmlFor="plan-amount"
                    value="Plan Amount"
                />
                <TextInput
                    id="plan-amount"
                    placeholder="15,000"
                    disabled
                />
            </div>
            

            <div className="space-y-2 w-full">
                <Label
                    htmlFor="bank-name"
                    value="Bank Name"
                />
                <TextInput
                    id="bank-name"
                    placeholder="Guaranty Trust Bank (GTB)"
                    disabled
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="payment-code"
                    value="Payment Code"
                />
                <TextInput
                    id="payment-code"
                    placeholder="*737*15000*020394955"
                    disabled
                />
            </div>
        
            
        </div>

        {/* <Button color="magenta" size={"lg"} className="self-start mt-8">
            <div className="space-x-2 flex items-center">
                <p>Continue</p>
                <ArrowRight />
            </div>
        </Button> */}

        {/* <Tab/> */}
    </div>
  )
}
