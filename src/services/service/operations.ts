import { Client, rootType } from "../index";
import { serviceType, countryType, TProduct, TServiceForm, TSubForm, TProductForm } from "./types";

export const getServices = async () => {
  const client = await Client();
  client.get<rootType<serviceType[]>>("/services");
};

export const getService = async ({ id }: { id: string }) => {
  const client = await Client();
  client.get<rootType<serviceType>>(`/services/${id}`);
};

export const getServiceForms = async ({ serviceId }: { serviceId: string }) => {
  const client = await Client();
  client.get<rootType<TServiceForm[]>>(`/services/forms/${serviceId}`);
};

export const getServiceFormSubForms = async ({ serviceFormId }: { serviceFormId: string }) => {
  const client = await Client();
  client.get<rootType<TSubForm[]>>(`/services/subforms/${serviceFormId}`);
};

export const getCountries = async () => {
  const client = await Client();
  client.get<rootType<countryType[]>>("/countries");
};

export const getProductById = async ({ id }: { id: string }) => {
  const client = await Client();
  client.get<rootType<TProduct>>(`/products/${id}`);
};

export const getServiceProductsById = async ({ serviceId }: { serviceId?: string }) => {
  const client = await Client();
  client.get<rootType<TProduct[]>>(`/products/service/${serviceId}`);
};

export const getCountryServiceProducts = async ({
  serviceId,
  country,
}: {
  serviceId: string;
  country: string;
}) => {
  const client = await Client();
  client.get<rootType<TProduct[]>>(
    `/products/service/country/${serviceId}/${country.toLowerCase()}`
  );
};

export const getProductForm = async ({ productId }: { productId: string }) => {
  const client = await Client();
  return client.get<rootType<TProductForm[]>>(`/products/formByProduct/${productId}`);
};
