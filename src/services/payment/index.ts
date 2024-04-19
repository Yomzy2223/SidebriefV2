import { useMutation } from "@tanstack/react-query";
import { PaymentPayload } from "./types";
import { initializePayment } from "./operation";

export const useInitPayment = () => {
  return useMutation({
    mutationKey: ["Initialize payment"],
    mutationFn: (payload: PaymentPayload) => initializePayment(payload),
  });
};
