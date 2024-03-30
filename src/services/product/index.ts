import { useMutation, useQuery } from "@tanstack/react-query";
import {
  saveProductQA,
  updateProductQA,
  getproductQA,
  addServiceToProduct,
  getProductRequest,
  getProductForm,
} from "./operations";
import { saveProductQAPayload, addServiceToProductPayload, updateProductQAPayload } from "./types";
import { useToast } from "@/components/ui/use-toast";

export const useSaveProductQA = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["save product QA"],
    mutationFn: (payload: saveProductQAPayload) => saveProductQA(payload),
    onError(error: any) {
      const errorMessage = error.response.data.error;
      toast({
        className: "bg-red-200 border border-destructive-foreground",
        title: "Failed",
        description: errorMessage,
        // success: hideIcon ? null : false,
        // action,
      });
    },
  });
};

export const useUpdateProductQA = () =>
  useMutation({
    mutationKey: ["update product QA"],
    mutationFn: (payload: updateProductQAPayload) => updateProductQA(payload),
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
