import { useQuery } from "@tanstack/react-query";
import {
  getServices,
  getService,
  getServiceForms,
  getServiceFormSubForms,
  getCountries,
  getServiceProductsById,
  getCountryServiceProducts,
  getProductById,
  getProductForm,
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

export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ id }),
    enabled: !!id,
  });

export const useGetServiceproduct = (serviceId: string) =>
  useQuery({
    queryKey: ["product", serviceId],
    queryFn: () => getServiceProductsById({ serviceId }),
    enabled: !!serviceId,
  });

export const useGetCountryServiceProduct = ({
  serviceId,
  country,
}: {
  serviceId: string;
  country: string;
}) =>
  useQuery({
    queryKey: ["product", serviceId, country],
    queryFn: () => getCountryServiceProducts({ serviceId, country }),
    enabled: !!serviceId && !!country,
  });

export const useGetProductForm = (productId: string) =>
  useQuery({
    queryKey: ["get product form", productId],
    queryFn: () => getProductForm({ productId: productId }),
  });
