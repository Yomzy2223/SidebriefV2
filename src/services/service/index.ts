import { useQuery } from "@tanstack/react-query";
import { getServices } from "./operations";

export const useGetServices = () => {
	return useQuery({
		queryKey: ["all services"],
		queryFn: getServices,
	});
};
