import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import { Oval } from "react-loading-icons";

export const PaymentForm: React.FC<{ clientSecret: string; close: () => void }> = ({
  clientSecret,
  close,
}) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    await elements?.submit();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("Payment succeeded!");
      close();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      <Button
        color="secondary"
        disabled={!stripe}
        type="submit"
        size={"lg"}
        isProcessing={loading}
        processingSpinner={<Oval color="white" strokeWidth={4} className="h-5 w-5" />}
      >
        Pay
      </Button>
    </form>
  );
};
