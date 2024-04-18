import { axios, rootType } from "../index";
import {
  serviceType,
  serviceFormType,
  serviceFormSubFormType,
  countryType,
  IProduct,
} from "./types";

export const getServices = () => axios.get<rootType<serviceType[]>>("/services");

export const getService = ({ id }: { id: string }) =>
  axios.get<rootType<serviceType>>(`/services/${id}`);

export const getServiceForms = ({ serviceId }: { serviceId: string }) =>
  axios.get<rootType<serviceFormType[]>>(`/services/forms/${serviceId}`);

export const getServiceFormSubForms = ({ serviceFormId }: { serviceFormId: string }) =>
  axios.get<rootType<serviceFormSubFormType[]>>(`/services/subforms/${serviceFormId}`);

export const getCountries = () => axios.get<rootType<countryType[]>>("/countries");

export const getServiceProductsById = ({ serviceId }: { serviceId?: string }) =>
  axios.get<rootType<IProduct[]>>(`/products/service/${serviceId}`);

export const getCountryServiceProducts = ({
  serviceId,
  country,
}: {
  serviceId: string;
  country: string;
}) =>
  axios.get<rootType<IProduct[]>>(
    `/products/service/country/${serviceId}/${country.toLowerCase()}`
  );
