import { axios, rootType } from "../index";
import {
	serviceType,
	serviceFormType,
	serviceFormSubFormType,
	countryType,
	serviceProductType,
} from "./types";

export const getServices = () =>
	axios.get<rootType<serviceType[]>>("/services");

export const getService = ({ id }: { id: string }) =>
	axios.get<rootType<serviceType>>(`/services/${id}`);

export const getServiceForms = ({ serviceId }: { serviceId: string }) =>
	axios.get<rootType<serviceFormType[]>>(`/services/forms/${serviceId}`);

export const getServiceFormSubForms = ({
	serviceFormId,
}: {
	serviceFormId: string;
}) =>
	axios.get<rootType<serviceFormSubFormType[]>>(
		`/services/subforms/${serviceFormId}`
	);

export const getCountries = () =>
	axios.get<rootType<countryType[]>>("/countries");

export const getServiceProductsById = ({ serviceId }: { serviceId?: string }) =>
	axios.get<rootType<serviceProductType[]>>(`/products/service/${serviceId}`);
