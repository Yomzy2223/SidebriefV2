import { axios } from "../index";

type forgotPasswordResponse = {};
export type forgetPasswordPayload = {
	email: string;
};

export const forgetPassword = ({ email }: forgetPasswordPayload) => {
	return axios.post<forgotPasswordResponse, forgetPasswordPayload>(
		"/users/forgotpassword",
		{
			email: email,
		}
	);
};

type resetPasswordResponse = {};
export type resetPasswordPayload = {
	password: string;
	token: string;
};

export const resetPassword = ({ password, token }: resetPasswordPayload) =>
	axios.post<resetPasswordResponse, resetPasswordPayload>(
		"/users/resetpassword",
		{
			token: token,
			password: password,
		}
	);
