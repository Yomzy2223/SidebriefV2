import {
  getProduct,
  getProductForm,
  getProductSubForm,
  getServiceProductForms,
  getServiceProducts,
} from "@/hooks/api/productApi";
import { useQuery } from "@tanstack/react-query";

const useProductApi = () => {
  const useGetProductQuery = (id: string) =>
    useQuery({
      queryKey: ["product", id],
      queryFn: ({ queryKey }) => getProduct(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetServiceProductsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["product", serviceId],
      queryFn: ({ queryKey }) => getServiceProducts(queryKey[1]),
      enabled: serviceId ? true : false,
    });

  const useGetProductFormsQuery = (productId: string) =>
    useQuery({
      queryKey: ["Product Form", productId],
      queryFn: ({ queryKey }) => getProductForm(queryKey[1]),
      enabled: productId ? true : false,
    });

  const useGetServiceProductFormsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["Product Form", serviceId],
      queryFn: ({ queryKey }) => getServiceProductForms(queryKey[1]),
      enabled: serviceId ? true : false,
    });

  const useGetProductSubFormQuery = (id: string) =>
    useQuery({
      queryKey: ["Product Form", id],
      queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetProductFormSubFormsQuery = (formId: string) =>
    useQuery({
      queryKey: ["Product Form", formId],
      queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
      enabled: formId ? true : false,
    });

  return {
    useGetProductQuery,
    useGetServiceProductsQuery,
    useGetProductFormsQuery,
    useGetServiceProductFormsQuery,
    useGetProductSubFormQuery,
    useGetProductFormSubFormsQuery,
  };
};

export default useProductApi;
