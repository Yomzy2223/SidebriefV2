import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateBusinessPayload, ICreateRequestPayload } from "./types";
import {
  getBusinessRequest,
  createBusinessRequest,
  createProductRequest,
  getUserBusinessRequests,
} from "./operations";

const queryClient = useQueryClient();

export const useCreateBusinessRequest = () =>
  useMutation({
    mutationFn: (payload: ICreateBusinessPayload) => createBusinessRequest(payload),
    mutationKey: ["create new product"],
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["business requests"] });
    },
  });

export const useCreateProductRequest = () =>
  useMutation({
    mutationFn: (payload: ICreateRequestPayload) => createProductRequest(payload),
    mutationKey: ["create new product"],
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["business requests"] });
    },
  });

export const useGetBusinessRequest = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => getBusinessRequest({ id }),
    queryKey: ["business requests", id],
    enabled: !!id,
  });

export const useGetUserBusinessRequests = ({ userId }: { userId: string }) =>
  useQuery({
    queryFn: () => getUserBusinessRequests({ userId }),
    queryKey: ["business requests", userId],
    enabled: !!userId,
  });
