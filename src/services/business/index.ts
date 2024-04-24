import { useMutation, useQuery } from "@tanstack/react-query";
import { createProcessPayload } from "./types";
import {
  GetBusinessRequest,
  GetUserBusinessRequests,
  createNewBusinessRequest,
} from "./operations";

export const useCreateNewBusinessRequest = () =>
  useMutation({
    mutationFn: (payload: createProcessPayload) => createNewBusinessRequest(payload),
    mutationKey: ["create new product"],
  });

export const useGetBusinessRequest = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => GetBusinessRequest({ id }),
    queryKey: ["get process request", id],
    enabled: !!id,
  });

export const useGetUserBusinessRequests = ({ userId }: { userId: string }) =>
  useQuery({
    queryFn: () => GetUserBusinessRequests({ userId }),
    queryKey: ["get user request", userId],
    enabled: !!userId,
  });
