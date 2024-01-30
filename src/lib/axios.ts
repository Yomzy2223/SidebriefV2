
import axios from "axios";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const Client = async () => {
    try {
        const session = await getSession();

        const apiClient = axios.create({
            baseURL:
                process.env.NODE_ENV === "production"
                    ? "https://iapkmjspxh.us-east-1.awsapprunner.com/"
                    : "https://h2rwx2fbhm.us-east-1.awsapprunner.com/",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return apiClient;

    } catch (error) {
        console.error("Error creating API client:", error);
        throw error;
    }
};




  


