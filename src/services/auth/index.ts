import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  forgetPassword,
  resetPassword,
  forgetPasswordPayload,
  resetPasswordPayload,
} from "./operations";

export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: ({ email }: forgetPasswordPayload) => forgetPassword({ email }),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product requests"] });
    },
  });
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: ({ password, token }: resetPasswordPayload) => resetPassword({ password, token }),
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product requests"] });
    },
  });
};
