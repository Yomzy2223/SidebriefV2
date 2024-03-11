import { useGlobalFucntions } from "./globalFunctions";
import { useResponse } from "./useResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getUserRequests,
  updateRequest,
} from "./api/requestApi";

const useRequestApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const { setQuery } = useGlobalFucntions();
  const queryClient = useQueryClient();

  const createRequestMutation = useMutation({
    mutationFn: createRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const updateRequestMutation = useMutation({
    mutationFn: updateRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const deleteRequestMutation = useMutation({
    mutationFn: deleteRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const useGetRequestQuery = (id: string) =>
    useQuery({
      queryKey: ["request", id],
      queryFn: ({ queryKey }) => getRequest(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetUserRequestsQuery = (userId: string) =>
    useQuery({
      queryKey: ["request", userId],
      queryFn: ({ queryKey }) => getUserRequests(queryKey[1]),
      enabled: userId ? true : false,
    });

  return {
    createRequestMutation,
    updateRequestMutation,
    deleteRequestMutation,
    useGetRequestQuery,
    useGetUserRequestsQuery,
  };
};

export default useRequestApi;
