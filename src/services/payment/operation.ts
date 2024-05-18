import { Client, rootType } from "../index";
import { PaymentPayload, createPaymentIntentPayload, PaystackResponse } from "./types";

export const initializePayment = async (payload: PaymentPayload) => {
  const client = await Client();
  return client.post<rootType<any>>("/payment", payload);
};

export const CreateStripePaymentIntent = async (payload: createPaymentIntentPayload) => {
  const client = await Client();
  return client.post<rootType<any>>("/payment/intent", payload);
};

export const initializePaystack = async (payload: createPaymentIntentPayload) => {
  const client = await Client();
  return client.post<rootType<PaystackResponse>>("/payment/paystack", payload);
};
