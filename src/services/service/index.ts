import { useQuery } from "@tanstack/react-query";
import {
  getServices,
  getService,
  getServiceForms,
  getServiceFormSubForms,
  getCountries,
  // getServiceProductsById,
  // getCountryServiceProducts,
  // getProductById,
  // getProductForm,
  // getProductSuggestion,
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

export const useGetServiceForms = (serviceId: string) =>
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
