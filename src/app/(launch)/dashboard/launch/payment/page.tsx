"use client"

import { Badge, Button, Checkbox, Datepicker, Label, TextInput } from "@/components/flowbite";
import { Copy } from "@/assets/svg";
import { IoCopyOutline } from "react-icons/io5";
import { ArrowRight } from "@/assets/icons";
import Tab from "./Tab";
import { PaymentOption } from "./PaymentOption";


export default function Payment() {
  return (
    
    <div className="pr-0 md:pr-20 w-full">
        <div className="space-y-14">
            {/* <PaymentOption/> */}
            <Tab/>
        </div>
    </div>
    
  )
};
