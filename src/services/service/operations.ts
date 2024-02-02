import { axios, rootType } from "../index";
import { serviceType, serviceFormType, serviceFormSubFormType } from "./types";

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
