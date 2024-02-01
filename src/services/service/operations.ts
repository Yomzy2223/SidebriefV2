import { axios, rootType } from "../index";
import { serviceType } from "./types";

export const getServices = () =>
	axios.get<rootType<serviceType[]>>("/services");

export const getService = ({ id }: { id: string }) =>
	axios.get<rootType<serviceType>>(`/services/${id}`);

export const getServiceForms = ({ serviceId }: { serviceId: string }) =>
	axios.get<rootType<any>>(`/services/forms/${serviceId}`);
