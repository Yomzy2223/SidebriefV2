import { useQuery } from "@tanstack/react-query";
import {
	getServices,
	getService,
	getServiceForms,
	getServiceFormSubForms,
	getCountries,
	getServiceProductsById,
} from "./operations";

export const useGetServices = () => {
	return useQuery({
		queryKey: ["all services"],
		queryFn: getServices,
	});
};

export const useGetService = (id: string) => {
	return useQuery({
		queryKey: ["service", id],
		queryFn: () => getService({ id }),
	});
};

export const useGetServiceForm = (serviceId: string) =>
	useQuery({
		queryKey: ["serviceForm", serviceId],
		queryFn: () => getServiceForms({ serviceId }),
	});

export const useGetServiceFormSubForms = (serviceFormId: string) =>
	useQuery({
		queryKey: ["serviceFormSubForms", serviceFormId],
		queryFn: () => getServiceFormSubForms({ serviceFormId }),
	});

export const useGetCountries = () =>
	useQuery({
		queryKey: ["countries"],
		queryFn: getCountries,
	});

export const useGetServiceproduct = (serviceId?: string) =>
	useQuery({
		queryKey: ["product", serviceId],
		queryFn: () => getServiceProductsById({ serviceId }),
		enabled: !!serviceId,
	});
