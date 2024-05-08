import { useGlobalFunctions } from "./globalFunctions";
import { useResponse } from "./useResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequest,
  getRequest,
  getAllRequests,
  updateRequest,
  getServiceRequests,
  assignRequest,
  unAssignRequest,
  searchRequest,
  getRequestForm,
  getBusinessDetails,
} from "./api/requestApi";

const useRequestApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const { setQuery } = useGlobalFunctions();
  const queryClient = useQueryClient();

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
      enabled: !!id,
    });

  const useGetRequestFormQuery = (requestId: string) =>
    useQuery({
      queryKey: ["request form", requestId],
      queryFn: ({ queryKey }) => getRequestForm(queryKey[1]),
      enabled: !!requestId,
    });

  const useGetServiceRequestQuery = ({
    serviceId,
    page,
    pageSize,
  }: {
    serviceId: string;
    page?: number;
    pageSize?: number;
  }) =>
    useQuery({
      queryKey: ["request", serviceId, page, pageSize],
      queryFn: ({ queryKey }) => {
        const payload = {
          serviceId: queryKey[1]?.toString() || "",
          page: queryKey[2],
          pageSize: queryKey[3],
        };
        return getServiceRequests(payload);
      },
      enabled: !!serviceId,
    });

  const useGetAllRequestsQuery = ({ page, pageSize }: { page?: number; pageSize?: number }) =>
    useQuery({
      queryKey: ["request", page, pageSize],
      queryFn: ({ queryKey }) => {
        const payload = {
          page: queryKey[1],
          pageSize: queryKey[2],
        };
        return getAllRequests(payload);
      },
    });

  const useGetBusinessDetailsQuery = (requestId: string) =>
    useQuery({
      queryKey: ["business", requestId],
      queryFn: ({ queryKey }) => getBusinessDetails(queryKey[1]),
      enabled: !!requestId,
    });

  const assignRequestMutation = useMutation({
    mutationFn: assignRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const unAssignRequestMutation = useMutation({
    mutationFn: unAssignRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const searchRequestMutation = useMutation({
    mutationFn: searchRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  return {
    updateRequestMutation,
    deleteRequestMutation,
    useGetRequestQuery,
    useGetServiceRequestQuery,
    useGetAllRequestsQuery,
    useGetRequestFormQuery,
    useGetBusinessDetailsQuery,
    assignRequestMutation,
    unAssignRequestMutation,
    searchRequestMutation,
  };
};

export default useRequestApi;
