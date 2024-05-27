import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCreateBusinessPayload, TCreateRequestPayload } from "./types";
import {
  getBusinessRequest,
  createBusinessRequest,
  createProductRequest,
  getUserBusinessRequests,
  updateProductRequest,
  getProductRequest,
  submitProductRequest,
  getbusinessDocuments,
  getRequestDocuments,
} from "./operations";
import { useResponse } from "..";

//
// BUSINESS ENDPOINTS HOOKS
export const useCreateBusinessRequest = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationFn: (payload: TCreateBusinessPayload) => createBusinessRequest(payload),
    mutationKey: ["create new product"],
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["product requests"] });
    },
  });
};

export const useGetBusinessRequest = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => getBusinessRequest({ id }),
    queryKey: ["product requests", id],
    enabled: !!id,
  });

export const useGetUserBusinessRequests = ({ userId }: { userId: string }) =>
  useQuery({
    queryFn: () => getUserBusinessRequests({ userId }),
    queryKey: ["product requests", userId],
    enabled: !!userId,
  });

//
// PRODUCT REQUEST ENDPOINTS HOOKS

export const useCreateProductRequest = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationFn: (payload: TCreateRequestPayload) => createProductRequest(payload),
    mutationKey: ["create new product"],
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["product requests"] });
    },
  });
};

export const useUpdateProductRequest = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationFn: ({ id, productId }: { id: string; productId: string }) =>
      updateProductRequest({ id, productId }),
    mutationKey: ["update new product"],
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["product requests"] });
    },
  });
};

export const useGetProductRequest = (productRequestId: string) =>
  useQuery({
    queryKey: ["get product by id", productRequestId],
    queryFn: () => getProductRequest({ productRequestId }),
    enabled: !!productRequestId,
  });

export const useSubmitProductRequest = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useResponse();

  return useMutation({
    mutationKey: ["submit product request"],
    mutationFn: ({ productRequestIds }: { productRequestIds: string[] }) =>
      submitProductRequest({ productRequestIds }),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product requests"] });
    },
  });
};

export const useGetBusinessDocuments = (businessId: string) =>
  useQuery({
    queryKey: ["request documents", businessId],
    queryFn: () => getbusinessDocuments({ businessId }),
    enabled: !!businessId,
  });

export const useGetRequestDocuments = (requestId: string) =>
  useQuery({
    queryKey: ["request documents", requestId],
    queryFn: () => getRequestDocuments({ requestId }),
    enabled: !!requestId,
  });
