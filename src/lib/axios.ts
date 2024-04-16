import axios from "axios";
import { getSession } from "next-auth/react";

export const Client = async () => {
  const session = await getSession();

  const client = axios.create({
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
