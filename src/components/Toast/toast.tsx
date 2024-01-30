import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';
type ToastOptions = {
  duration?: number; 
};

const useToaster = () => {
  useEffect(() => {
    const success = (message: string, options?: ToastOptions) => {
      toast.success(message, { duration: options?.duration });
    };

    const error = (message: string, options?: ToastOptions) => {
      toast.error(message, { duration: options?.duration });
    };

    const info = (message: string, options?: ToastOptions) => {
      toast(message, { duration: options?.duration });
    };

    const warning = (message: string, options?: ToastOptions) => {
        toast(message, { duration: options?.duration });
      };

    return () => {
      // Cleanup or do anything when the component unmounts
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        zIndex: 9999,
      }}
    />
  );
};

export default useToaster;
