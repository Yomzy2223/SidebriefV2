"use client";

import { Badge, Button, Checkbox, Datepicker, Label, TextInput } from "@/components/flowbite";
import { BankIcon, CardIcon, CreditCardIcon } from "@/assets/svg";
import { IoCopyOutline } from "react-icons/io5";
import { ArrowRight } from "@/assets/icons";
// import { Tab } from "./Tab";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DynamicForm from "@/components/form/dynamicForm";
import { options, cardFormElement } from "./constants";
import { useInitPayment } from "@/services/payment";
import { useParams } from "next/navigation";
import { useGetProcessRequest } from "@/services/process";
import { useGetProductById } from "@/services/service";
import { useSession } from "next-auth/react";

export const PaymentOption = () => {
  const [selectedOption, setSelectedOption] = useState(options[0].name);
  const initPayment = useInitPayment();
  const params: { service: string; processId: string } = useParams();
  const process = useGetProcessRequest({ id: params.processId });
  const product = useGetProductById(process.data?.data.data.productRequest[0].productId);
  const session = useSession();

  const productData = product.data?.data.data;
  const processData = process.data?.data.data;

  const onPaySubmit = async (values: { [key: string]: string }) => {
    await initPayment.mutateAsync({
      amount: `${productData?.amount || 0 * 100}`,
      currency: productData?.currency || "",
      productId: productData?.id || "",
      requestId: processData?.productRequest[0].id || "",
      cvv: values["cvv"],
      card_number: values["card-number"],
      email: session.data?.user.email,
      type: "card",
      expiry_month: values["expiry-month"],
      expiry_year: values["expiry-year"],
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h4 className="text-2xl leading-normal font-semibold">Card Payment</h4>
          <h2 className="text-md leading-normal font-normal">
            Select the payment gateway you want to use
          </h2>
        </div>
      </div>

      {/* <div className="flex space-x-12">
        {options.map((el) => (
          <div
            key={el.name}
            className={cn("flex flex-col items-center", {
              // "bg-gray-300": selectedOption === el.name,
            })}
            onClick={() => setSelectedOption(el.name)}
          >
            <Image src={el.icon} quality={100} alt="" />
          </div>
        ))}
      </div> */}

      <DynamicForm formInfo={cardFormElement} onFormSubmit={onPaySubmit}>
        <Button
          color="secondary"
          size={"lg"}
          className="self-start mt-8"
          type="submit"
          disabled={process.isLoading || product.isLoading}
        >
          <div className="space-x-2 flex items-center">
            <p>Continue</p>
            <ArrowRight />
          </div>
        </Button>
      </DynamicForm>

      {/* <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <Label htmlFor="promo-code" value="Promo Code (Optional) " />
          <TextInput id="Promo Code" placeholder="Guaranty Trust Bank (GTB)" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plan-amount" value="Plan Amount" />
          <TextInput id="plan-amount" placeholder="15,000" disabled />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="bank-name" value="Bank Name" />
          <TextInput id="bank-name" placeholder="Guaranty Trust Bank (GTB)" disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-code" value="Payment Code" />
          <TextInput id="payment-code" placeholder="*737*15000*020394955" disabled />
        </div>
      </div> */}

      {/* <Button color="secondary" size={"lg"} className="self-start mt-8">
            <div className="space-x-2 flex items-center">
                <p>Continue</p>
                <ArrowRight />
            </div>
        </Button> */}

      {/* <Tab/> */}
    </div>
  );
};
