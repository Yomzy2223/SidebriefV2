"use client";

import { IFormInput } from "@/components/form/constants";
import DynamicForm from "@/components/form/dynamicForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Oval } from "react-loading-icons";
import RequestWrapper from "../wrapper";
import { StripeSvg, PaystackSvg } from "@/assets/svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetProductById } from "@/services/product";
import numeral from "numeral";
import getCurrencySymbol from "currency-symbol-map";
import { useCreateStripePaymentIntent } from "@/services/payment";
import { Modal } from "flowbite-react";
import { StripeComponent } from "@/components/stripe";

const Payment = () => {
  const createStripeIntent = useCreateStripePaymentIntent();

  const [openStripe, setOpenStripe] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const { setQueriesWithPath } = useGlobalFunctions();
  const { serviceId } = useParams();
  const [selectedProvider, setSelectedProvided] = useState("");

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const hasPForms = searchParams.get("hasPForms");

  const getProduct = useGetProductById(productId);
  const product = getProduct.data?.data.data;

  // Used to create and update QA form
  const navigateToNextPage = () => {
    hasPForms === "true"
      ? setQueriesWithPath({
          path: `/requests/${serviceId}/forms`,
          queries: [{ name: "progress", value: "3" }],
        })
      : setQueriesWithPath({
          path: `/requests/${serviceId}/review`,
          queries: [{ name: "progress", value: "4" }],
        });
  };

  const handleStripePayment = () => {
    createStripeIntent.mutate(
      { amount: product?.amount ? product.amount * 100 : 0 },
      {
        onSuccess(data, variables, context) {
          const payment_intent = data.data.data;
          setClientSecret(payment_intent);
          setOpenStripe(true);
        },
      }
    );
  };

  const handlePayment = () => {
    switch (selectedProvider) {
      case "stripe":
        handleStripePayment();
        break;
      case "paystack":
        console.log("I am paystack");
        break;
      default:
        console.log("provider not valid");
    }
  };

  const closeStripe = () => {
    setOpenStripe(false);
    navigateToNextPage();
  };

  return (
    <RequestWrapper productId={productId} requestState="PAYMENT">
      <p className="text-2xl font-semibold mb-3">Choose your payment choice</p>
      <div className="flex flex-wrap gap-6 mb-8">
        {paymentProviders.map((el) => (
          <div
            key={el.id}
            className={cn("flex justify-center items-center h-20 w-28 rounded cursor-pointer", {
              "bg-blue-100": el.id === selectedProvider,
            })}
            onClick={() => setSelectedProvided(el.id)}
          >
            <Image src={el.image} alt={el.id} height={60} width={80} />
          </div>
        ))}
      </div>
      <div>
        <span className="font-medium text-lg">Amount</span>
        <p className="text-4xl font-semibold">
          {getCurrencySymbol(product?.currency || "") || "$"}
          {numeral(product?.amount).format("0,0")}
        </p>
      </div>
      {selectedProvider !== "" && (
        <div className="mt-8">
          <Button
            color="secondary"
            disabled={getProduct.isLoading}
            size={"lg"}
            onClick={handlePayment}
            isProcessing={createStripeIntent.isPending}
          >
            Complete payment
          </Button>
        </div>
      )}
      <Modal show={openStripe}>
        <Modal.Body>
          <StripeComponent clientSecret={clientSecret} close={closeStripe} />
        </Modal.Body>
      </Modal>

      {/* <DynamicForm
        formInfo={formInfo}
        onFormSubmit={submitFormHandler}
        className="gap-6"
        formClassName="gap-12 justify-between"
      >
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
      </DynamicForm> */}
    </RequestWrapper>
  );
};

export default Payment;

const formInfo: IFormInput[] = [
  {
    id: "1",
    name: "name1",
    label: "label1",
    type: "short answer",
    options: [],
    // compulsory: true,
    value: "value1",
  },
  {
    id: "2",
    name: "name2",
    label: "label2",
    type: "short answer",
    options: [],
    // compulsory: true,
    value: "value2",
  },
];

const paymentProviders = [
  {
    id: "stripe",
    name: "Stripe",
    image: StripeSvg,
  },
  {
    id: "paystack",
    name: "Paystack",
    image: PaystackSvg,
  },
];
