// import { useToaster } from 'react-hot-toast';

// type ToastOptions = {
//   autoDismiss?: boolean;
//   duration?: number;
// };

// export const useToast = () => {
//   const { error, success } = useToaster();

//   const showToast = (message: string, options?: ToastOptions) => {
//     if (options?.autoDismiss) {
//       if (options.duration) {
//         success(message, { duration: options.duration });
//       } else {
//         success(message);
//       }
//     } else {
//       error(message);
//     }
//   };

//   return { showToast };
// };
