// initialize axios
import defaultAxios, { AxiosError } from "axios";

export const axios = defaultAxios.create({
  baseURL: "https://h2rwx2fbhm.us-east-1.awsapprunner.com",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMDI1MTFmLWM1MzQtNDgyYy1iM2IwLTA4YzI1NWM2MDYyMSIsImlhdCI6MTcxMDI1MDE5NSwiZXhwIjoxNzExNDU5Nzk1fQ.ZxGAINFLOYkT7ZbPVOkuDwqbwLQkZSYwflAaM1UO6Uc",
  },
});

export default axios;

export type rootType<T = any> = {
  message: string;
  data: T;
};

export type errorType = AxiosError;

import { getSession } from "next-auth/react";

export const Client = async () => {
  const session = await getSession();

  const client = defaultAxios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://iapkmjspxh.us-east-1.awsapprunner.com/"
        : "https://h2rwx2fbhm.us-east-1.awsapprunner.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.user?.token ? `Bearer ${session?.user?.token}` : ``,
    },
  });
  return client;
};
