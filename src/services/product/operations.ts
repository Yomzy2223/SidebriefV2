import { Client, rootType } from "../index";
import { TProductForm, TProduct } from "./types";

export const getProductById = async ({ id }: { id: string }) => {
  const client = await Client();
  return client.get<rootType<TProduct>>(`/products/${id}`);
};

export const getServiceProductsById = async ({ serviceId }: { serviceId?: string }) => {
  const client = await Client();
  return client.get<rootType<TProduct[]>>(`/products/service/${serviceId}`);
};

export const getCountryServiceProducts = async ({
  serviceId,
  country,
}: {
  serviceId: string;
  country: string;
}) => {
  const client = await Client();
  return client.get<rootType<TProduct[]>>(
    `/products/service/country/${serviceId}/${country.toLowerCase()}`
  );
};

export const getProductForm = async ({ productId }: { productId: string }) => {
  const client = await Client();
  return client.get<rootType<TProductForm[]>>(`/products/formByProduct/${productId}`);
};

export const getProductSuggestion = async ({ objectives }: { objectives: string[] }) => {
  const client = await Client();
  return client.post<rootType<any>>(`/products/objective/all`, { objectives });
};
