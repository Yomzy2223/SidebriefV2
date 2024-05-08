import { Client, rootType } from "../index";
import { serviceType, countryType, TServiceForm, TSubForm } from "./types";

export const getServices = async () => {
  const client = await Client();
  return client.get<rootType<serviceType[]>>("/services");
};

export const getService = async ({ id }: { id: string }) => {
  const client = await Client();
  return client.get<rootType<serviceType>>(`/services/${id}`);
};

export const getServiceForms = async ({ serviceId }: { serviceId: string }) => {
  const client = await Client();
  return client.get<rootType<TServiceForm[]>>(`/services/forms/${serviceId}`);
};

export const getServiceFormSubForms = async ({ serviceFormId }: { serviceFormId: string }) => {
  const client = await Client();
  return client.get<rootType<TSubForm[]>>(`/services/subforms/${serviceFormId}`);
};

export const getCountries = async () => {
  const client = await Client();
  return client.get<rootType<countryType[]>>("/countries");
};
