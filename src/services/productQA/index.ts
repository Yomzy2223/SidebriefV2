import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveProductQA, updateProductQA, getproductQA, deleteProductQA } from "./operations";
import { saveProductQAPayload, updateProductQAPayload, deleteProductQAPayload } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useResponse } from "@/hooks/useResponse";

export const useSaveProductQA = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useResponse();

  return useMutation({
    mutationKey: ["save product QA"],
    mutationFn: (payload: saveProductQAPayload) => saveProductQA(payload),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["get product QA"] });
    },
  });
};

export const useUpdateProductQA = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useResponse();

  useMutation({
    mutationKey: ["update product QA"],
    mutationFn: (payload: updateProductQAPayload) => updateProductQA(payload),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["get product QA"] });
    },
  });
};

export const useDeleteProductQA = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useResponse();

  useMutation({
    mutationKey: ["delete product QA"],
    mutationFn: (payload: deleteProductQAPayload) => deleteProductQA(payload),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["get product QA"] });
    },
  });
};

export const useGetProductQA = (productId: string | undefined) =>
  useQuery({
    queryKey: ["get product QA", productId],
    queryFn: () => getproductQA({ productId }),
    enabled: !!productId,
  });
