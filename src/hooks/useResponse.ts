import { useToast } from "@/components/ui/use-toast";

interface responseType {
  title?: string;
  action?: any;
  hideIcon?: boolean;
}

interface successType extends responseType {
  data: any;
}
interface errorType extends responseType {
  error: any;
}

export const useResponse = () => {
  const { toast } = useToast();

  const handleError = ({ error, title, action, hideIcon }: errorType) => {
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

  const handleSuccess = ({ data, title, action, hideIcon }: successType) => {
    let successMessage;
    if (data?.data?.message) successMessage = data?.data?.message;
    if (data?.message) successMessage = data?.message;
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
