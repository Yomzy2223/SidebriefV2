import { useMutation } from "@tanstack/react-query";
import { PaymentPayload, createPaymentIntentPayload } from "./types";
import { initializePayment, CreateStripePaymentIntent, initializePaystack } from "./operation";

export const useInitPayment = () => {
  return useMutation({
    mutationKey: ["Initialize payment"],
    mutationFn: (payload: PaymentPayload) => initializePayment(payload),
  });
};

export const useCreateStripePaymentIntent = () => {
  return useMutation({
    mutationKey: ["Create Stripe Intent"],
    mutationFn: (payload: createPaymentIntentPayload) => CreateStripePaymentIntent(payload),
  });
};

export const useInitializePaystack = () => {
  return useMutation({
    mutationKey: ["initialize paysyack payment"],
    mutationFn: (payload: createPaymentIntentPayload) => initializePaystack(payload),
  });
};
