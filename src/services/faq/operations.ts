import { Client, rootType } from "..";
import { TCreateFAQ, TFAQ } from "./types";

export const getFAQ = async (id: string) => {
  const client = await Client();
  return await client.get<rootType<TFAQ>>(`/faqs/${id}`);
};

export const getProductFAQs = async ({
  productId,
  requestState,
}: {
  productId: string;
  requestState: string;
}) => {
  const client = await Client();
  return await client.get<rootType<TFAQ[]>>(
    `/faqs/product/${productId}?requestState=${requestState}`
  );
};

export const getServiceFAQs = async (serviceId: string) => {
  const client = await Client();
  return (await client.get)<rootType<TFAQ[]>>(`/faqs/service/${serviceId}`);
};

export const getAllFAQs = async () => {
  const client = await Client();
  return await client.get<rootType<TFAQ[]>>(`/faqs`);
};
