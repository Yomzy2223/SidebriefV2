"use client";

import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Oval } from "react-loading-icons";
import RequestWrapper from "../wrapper";
import { StripeSvg, PaystackSvg } from "@/assets/svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetProductById } from "@/services/product";
import numeral from "numeral";
import getCurrencySymbol from "currency-symbol-map";
import { useCreateStripePaymentIntent, useInitializePaystack } from "@/services/payment";
import { Modal } from "flowbite-react";
import { StripeComponent } from "@/components/stripe";
import { useSession } from "next-auth/react";
import ConfirmAction from "@/components/confirmAction";
import { countries, TCountryCode } from "countries-list";
import { CheckCheck } from "lucide-react";

const Payment = () => {
  const [openExit, setOpenExit] = useState(false);

  const router = useRouter();

  const createStripeIntent = useCreateStripePaymentIntent();
  const initializedPaystack = useInitializePaystack();
  const session = useSession();

  const [openStripe, setOpenStripe] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const { setQueriesWithPath } = useGlobalFunctions();
  const { serviceId } = useParams();
  const [selectedProvider, setSelectedProvided] = useState(paymentProviders[0].id);

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const hasPForms = searchParams.get("hasPForms");
  const requestId = searchParams.get("requestId") || "";
  const businessId = searchParams.get("businessId");

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
      {
        amount: product?.amount ? product.amount * 100 : 0,
        email: session.data?.user.email,
        requestId: requestId,
      },
      {
        onSuccess(data) {
          const payment_intent = data.data.data;
          setClientSecret(payment_intent);
          setOpenStripe(true);
        },
      }
    );
  };

  const handlePaystackPayment = () => {
    initializedPaystack.mutate(
      {
        amount: product?.amount ? product.amount * 100 : 0,
        email: session.data?.user.email,
        requestId: requestId,
      },
      {
        onSuccess(data, variables, context) {
          const url = data.data.data.data.authorization_url;
          window.location.href = url;
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
        handlePaystackPayment();
        break;
      default:
        console.log("provider not valid");
    }
  };

  const closeStripe = () => {
    setOpenStripe(false);
    navigateToNextPage();
  };

  const originalCountry = Object.keys(countries)
    .map((el: string) => countries[el as TCountryCode].name)
    .find((el) => el.toLowerCase() === product?.country?.toLowerCase());

  return (
    <RequestWrapper productId={productId} requestState="PAYMENT">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm leading-normal text-foreground-3">STEP 3</h4>
          <Button
            size="fit"
            color="transparent"
            className="text-primary"
            onClick={() => setOpenExit(true)}
          >
            Save and continue later
          </Button>
        </div>
        <p className="text-2xl font-semibold">Choose your payment choice</p>
      </div>

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
      <div className="flex flex-col gap-6">
        {product?.name && (
          <p className="sb-text-16 font-normal text-foreground-3">
            Create your {product?.name} request in {originalCountry} within just {product?.timeline}{" "}
            for {getCurrencySymbol(product?.currency || "")}
            {numeral(product?.amount).format("0,0")} only.
          </p>
        )}
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Features</p>
          <div className="flex gap-4">
            {product?.feature?.map((feature) => (
              <span className="flex items-center gap-2">
                <span className="bg-primary p-1 rounded-full">
                  {<CheckCheck color="white" size={12} />}
                </span>{" "}
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      {selectedProvider !== "" && !openStripe && (
        <div className="mt-8">
          <Button
            color="secondary"
            disabled={getProduct.isLoading}
            size={"lg"}
            onClick={handlePayment}
            isProcessing={createStripeIntent.isPending || initializedPaystack.isPending}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-5 w-5" />}
          >
            Click to pay
          </Button>
        </div>
      )}
      {/* <Modal show={openStripe}>
        <Modal.Body> */}

      <div className="mt-6">
        <StripeComponent clientSecret={clientSecret} close={closeStripe} />
      </div>

      {openExit && (
        <ConfirmAction
          open={openExit}
          setOpen={setOpenExit}
          confirmAction={() => router.push(`/dashboard/?businessId=${businessId}`)}
          title="Save and exit"
          description="Are you sure you want to save and continue later"
          dismissible
        />
      )}
    </RequestWrapper>
  );
};

export default Payment;

// const formInfo: IFormInput[] = [
//   {
//     id: "1",
//     name: "name1",
//     label: "label1",
//     type: "short answer",
//     options: [],
//     // compulsory: true,
//     value: "value1",
//   },
//   {
//     id: "2",
//     name: "name2",
//     label: "label2",
//     type: "short answer",
//     options: [],
//     // compulsory: true,
//     value: "value2",
//   },
// ];

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
