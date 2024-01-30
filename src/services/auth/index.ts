import { useMutation } from "@tanstack/react-query";
import {
	forgetPassword,
	resetPassword,
	forgetPasswordPayload,
	resetPasswordPayload,
} from "./operations";

export const useForgotPassword = () => {
	return useMutation({
		mutationKey: ["forgotPassword"],
		mutationFn: ({ email }: forgetPasswordPayload) =>
			forgetPassword({ email }),
	});
};

export const useResetPassword = () => {
	return useMutation({
		mutationKey: ["resetPassword"],
		mutationFn: ({ password, token }: resetPasswordPayload) =>
			resetPassword({ password, token }),
	});
};
