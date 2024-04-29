import { Client } from "../index";

type forgotPasswordResponse = {};
export type forgetPasswordPayload = {
  email: string;
};

export const forgetPassword = async ({ email }: forgetPasswordPayload) => {
  const axios = await Client();
  return axios.post<forgotPasswordResponse, forgetPasswordPayload>("/users/forgotpassword", {
    email: email,
  });
};

type resetPasswordResponse = {};
export type resetPasswordPayload = {
  password: string;
  token: string;
};

export const resetPassword = async ({ password, token }: resetPasswordPayload) => {
  const axios = await Client();
  return axios.post<resetPasswordResponse, resetPasswordPayload>("/users/resetpassword", {
    token: token,
    password: password,
  });
};
