import { useQuery } from "@tanstack/react-query";
import {
  getServiceProductsById,
  getCountryServiceProducts,
  getProductById,
  getProductForm,
  getProductSuggestion,
} from "./operations";

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

export const useGetProductForms = (productId: string) =>
  useQuery({
    queryKey: ["get product form", productId],
    queryFn: () => getProductForm({ productId: productId }),
    enabled: !!productId,
  });

export const useGetProductSuggestions = ({ objectives }: { objectives: string[] }) => {
  return useQuery({
    queryKey: ["product suggestions", ...objectives],
    queryFn: () => getProductSuggestion({ objectives }),
    enabled: objectives.length > 0,
  });
};
