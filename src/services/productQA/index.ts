import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  saveRequestQA,
  updateRequestQA,
  getRequestQA,
  deleteRequestQA,
  getRequestFormQA,
} from "./operations";
import { saveRequestQAPayload, updateRequestQAPayload, deleteRequestQAPayload } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useResponse } from "@/hooks/useResponse";

export const useSaveRequestQA = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["save product QA"],
    mutationFn: (payload: saveRequestQAPayload) => saveRequestQA(payload),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["get product QA"] });
    },
  });
};

export const useUpdateRequestQA = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["update product QA"],
    mutationFn: (payload: updateRequestQAPayload) => updateRequestQA(payload),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["get product QA"] });
    },
  });
};

export const useDeleteRequestQA = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useResponse();

  return useMutation({
    mutationKey: ["delete product QA"],
    mutationFn: (payload: deleteRequestQAPayload) => deleteRequestQA(payload),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["get product QA"] });
    },
  });
};

export const useGetRequestQA = (requestId: string) =>
  useQuery({
    queryKey: ["get product QA", requestId],
    queryFn: () => getRequestQA({ requestId }),
    enabled: !!requestId,
  });

export const useGetRequestFormQA = ({ formId, requestId }: { formId: string; requestId: string }) =>
  useQuery({
    queryKey: ["get product QA", formId, requestId],
    queryFn: ({ queryKey }) => getRequestFormQA({ formId: queryKey[1], requestId: queryKey[2] }),
    enabled: !!formId,
  });
