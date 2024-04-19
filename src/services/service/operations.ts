import { axios, rootType } from "../index";
import { serviceType, countryType, TProduct, TServiceForm, TSubForm } from "./types";

export const getServices = () => axios.get<rootType<serviceType[]>>("/services");

export const getService = ({ id }: { id: string }) =>
  axios.get<rootType<serviceType>>(`/services/${id}`);

export const getServiceForms = ({ serviceId }: { serviceId: string }) =>
  axios.get<rootType<TServiceForm[]>>(`/services/forms/${serviceId}`);

export const getServiceFormSubForms = ({ serviceFormId }: { serviceFormId: string }) =>
  axios.get<rootType<TSubForm[]>>(`/services/subforms/${serviceFormId}`);

export const getCountries = () => axios.get<rootType<countryType[]>>("/countries");

export const getProductById = ({ id }: { id: string }) =>
  axios.get<rootType<TProduct>>(`/products/${id}`);

export const getServiceProductsById = ({ serviceId }: { serviceId?: string }) =>
  axios.get<rootType<TProduct[]>>(`/products/service/${serviceId}`);

export const getCountryServiceProducts = ({
  serviceId,
  country,
}: {
  serviceId: string;
  country: string;
}) =>
  axios.get<rootType<TProduct[]>>(
    `/products/service/country/${serviceId}/${country.toLowerCase()}`
  );
