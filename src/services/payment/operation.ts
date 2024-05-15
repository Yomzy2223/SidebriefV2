import { Client, rootType } from "../index";
import { PaymentPayload, createStripeIntentPayload } from "./types";

export const initializePayment = async (payload: PaymentPayload) => {
  const client = await Client();
  return client.post<rootType<any>>("/payment", payload);
};

export const CreateStripePaymentIntent = async (payload: createStripeIntentPayload) => {
  const client = await Client();
  return client.post<rootType<any>>("/payment/intent", payload);
};
