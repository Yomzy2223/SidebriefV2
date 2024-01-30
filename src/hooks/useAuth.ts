import { signIn, signUp, resetPassword, forgotPassword } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const router = useRouter();
    const signInMutation = useMutation({
        mutationFn: signIn,
        onError(error) {

        },
        onSuccess(data) {
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          router.push("/");
        },
        retry: 3,
    });

    const signUpMutation = useMutation({
    mutationFn: signUp,
    onError(error) {
    },
    onSuccess(data) {
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            router.push("/");
        },
        retry: 3,
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onError(error, variables, context) {

        },
        onSuccess(data, variables, context) {
          router.push("/auth/reset-password");
        },
        retry: 3,
      });
    
      const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onError(error) {

        },
        onSuccess(data) {
          router.push("/auth/login");
        },
        retry: 3,
      });

    return {
        signUpMutation,
        signInMutation,
        forgotPasswordMutation,
        resetPasswordMutation
    };
};
