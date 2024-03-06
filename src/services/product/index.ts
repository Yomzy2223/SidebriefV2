import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewProductRequest,
  saveProductQA,
  getproductQA,
  addServiceToProduct,
  getProductRequest,
  getProductForm,
} from "./operations";
import { saveProductQAPayload, addServiceToProductPayload, createProductPayload } from "./types";

export const useCreateNewProductRequest = () =>
  useMutation({
    mutationFn: (payload: createProductPayload) => createNewProductRequest(payload),
    mutationKey: ["create new product"],
  });

export const useSaveProductQA = () =>
  useMutation({
    mutationKey: ["save product QA"],
    mutationFn: (payload: saveProductQAPayload) => saveProductQA(payload),
  });

export const useGetProductQA = (productId: string | undefined) =>
  useQuery({
    queryKey: ["get product QA", productId],
    queryFn: () => getproductQA({ productId }),
    enabled: !!productId,
  });

export const useAddServiceToProduct = () =>
  useMutation({
    mutationKey: ["add service too product"],
    mutationFn: (payload: addServiceToProductPayload) => addServiceToProduct(payload),
  });

export const useGetProductRequest = (productRequestId: string) =>
  useQuery({
    queryKey: ["get product by id", productRequestId],
    queryFn: () => getProductRequest({ productRequestId }),
    enabled: !!productRequestId,
  });

export const useGetProductForm = (productId: string) =>
  useQuery({
    queryKey: ["get product form", productId],
    queryFn: () => getProductForm({ productId: productId }),
  });
