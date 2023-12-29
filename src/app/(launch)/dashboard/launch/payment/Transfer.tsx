import React from 'react'
import { Label, TextInput } from "@/components/flowbite";
import { IoCopyOutline } from "react-icons/io5";


const Transfer = () => {
  return (
    <div className="space-y-8">
        <div className="flex justify-between w-full">
            <div className="flex flex-col">
                <h4 className="text-2xl leading-normal font-semibold">
                    Bank Transfer
                </h4>
                <h2 className="text-md leading-normal font-normal">
                    Use the bank details to make transfer to our account.
                </h2>
            </div>
        </div>
        
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
                    htmlFor="bank-account"
                    value="Bank Account Number"
                />
                <TextInput
                    id="bank-account"
                    placeholder="0249180760"
                    disabled
                    rightIcon={IoCopyOutline}
                />
            </div>
            
        </div>
    </div>
  )
}

export default Transfer