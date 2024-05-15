import { useMutation } from "@tanstack/react-query";
import { PaymentPayload } from "./types";
import { initializePayment, CreateStripePaymentIntent } from "./operation";

export const useInitPayment = () => {
  return useMutation({
    mutationKey: ["Initialize payment"],
    mutationFn: (payload: PaymentPayload) => initializePayment(payload),
  });
};

export const useCreateStripePaymentIntent = () => {
  return useMutation({
    mutationKey: ["Create Stripe Intent"],
    mutationFn: (payload: { amount: number }) => CreateStripePaymentIntent(payload),
  });
};
