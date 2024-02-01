import { useQuery } from "@tanstack/react-query";
import { getServices, getService, getServiceForms } from "./operations";

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
