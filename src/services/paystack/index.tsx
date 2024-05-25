import { useQuery } from "@tanstack/react-query";
import { verifyPaystackPayment } from "./operation";

export const useVerifyPaystackPayment = ({ reference }: { reference: string }) =>
  useQuery({
    queryKey: ["paystack verify", reference],
    queryFn: () => verifyPaystackPayment({ reference }),
    enabled: !!reference,
  });
