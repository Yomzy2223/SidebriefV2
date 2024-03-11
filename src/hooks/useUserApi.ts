import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  resetPassword,
  updateUser,
  verifyUserEmail,
} from "@/hooks/api/usersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "./useResponse";

const useUserApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
    },
    retry: 3,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
    },
    retry: 3,
  });

  const verifyUserEmailMutation = useMutation({
    mutationFn: verifyUserEmail,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    retry: 3,
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    retry: 3,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    retry: 3,
  });

  const useGetUserQuery = (id: string) =>
    useQuery({
      queryKey: ["user", id],
      queryFn: ({ queryKey }) => getUser(queryKey[1]),
      enabled: id ? true : false,
    });

  return {
    forgotPasswordMutation,
    resetPasswordMutation,
    verifyUserEmailMutation,
    deleteUserMutation,
    useGetUserQuery,
  };
};

export default useUserApi;
