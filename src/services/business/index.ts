import { useMutation, useQuery } from "@tanstack/react-query";
import { createProcessPayload } from "./types";
import { GetBusinessRequest, createNewBusinessRequest } from "./operations";

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
