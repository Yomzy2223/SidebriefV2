import { useMutation, useQuery } from "@tanstack/react-query";
import { createProcessPayload } from "./types";
import { GetProcessRequest, createNewProcessRequest } from "./operations";

export const useCreateNewProcessRequest = () =>
  useMutation({
    mutationFn: (payload: createProcessPayload) => createNewProcessRequest(payload),
    mutationKey: ["create new product"],
  });

export const useGetProcessRequest = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => GetProcessRequest({ id }),
    queryKey: ["get process request", id],
    enabled: !!id,
  });
