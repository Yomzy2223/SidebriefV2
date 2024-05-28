// initialize axios
import { useToast } from "@/components/ui/use-toast";
import defaultAxios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

export type rootType<T = any> = {
  message: string;
  data: T;
};

export type errorType = AxiosError;

export const Client = async () => {
  const session = await getSession();

  const client = defaultAxios.create({
    // baseURL:
    //   process.env.NODE_ENV === "production"
    //     ? "https://iapkmjspxh.us-east-1.awsapprunner.com/"
    //     : "https://h2rwx2fbhm.us-east-1.awsapprunner.com/",
    baseURL: "https://h2rwx2fbhm.us-east-1.awsapprunner.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.user?.token ? `Bearer ${session?.user?.token}` : ``,
    },
  });
  return client;
};

export const useResponse = () => {
  const { toast } = useToast();

  const handleError = ({ error, title, action, hideIcon }: IError) => {
    let errorMessage;
    if (error?.response?.data?.error) errorMessage = error?.response?.data?.error;
    if (typeof error === "string") errorMessage = error;
    console.log(error);
    toast({
      className: "bg-red-200 border border-destructive-foreground",
      title,
      description: errorMessage,
      success: hideIcon ? null : false,
      action,
    });
  };

  const handleSuccess = ({ data, title, action, hideIcon }: ISuccess) => {
    let successMessage;
    if (data?.data?.message) successMessage = data?.data?.message;
    if (typeof data === "string") successMessage = data;

    toast({
      className: "bg-blue-100",
      title,
      description: successMessage,
      success: hideIcon ? null : true,
      action,
    });
  };

  return {
    handleError,
    handleSuccess,
  };
};

interface IResponse {
  title?: string;
  action?: any;
  hideIcon?: boolean;
}
interface ISuccess extends IResponse {
  data: any;
}
interface IError extends IResponse {
  error: any;
}
