import { Client, rootType } from "../index";
import { PaymentPayload } from "./types";

export const initializePayment = async (payload: PaymentPayload) => {
  const client = await Client();
  return client.post<rootType<any>>("/payment", payload);
};
