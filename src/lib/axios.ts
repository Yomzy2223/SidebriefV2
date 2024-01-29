
import axios, { AxiosInstance } from "axios";
import { getSession, Session } from "next-auth/react";

export const Client = async (): Promise<AxiosInstance> => {
    try {
        const session = await getSession();

        const apiClient = axios.create({
            baseURL:
                process.env.NODE_ENV === "production"
                    ? "https://iapkmjspxh.us-east-1.awsapprunner.com/"
                    : "https://h2rwx2fbhm.us-east-1.awsapprunner.com/",
            headers: {
                "Content-Type": "application/json",
                // Authorization: session?.token ? `Bearer ${session.token}` : "",
            },
        });

        return apiClient;
    } catch (error) {
        console.error("Error creating API client:", error);
        throw error;
    }
};
