import { client } from "@/lib/config";

interface SignInProps {
    email: string;
    password: string;
}

interface SignUpProps extends SignInProps {
    name: string,
    referral: string;
}

export const signIn = async (formInfo: SignInProps) => {
    const loginResponse = await client.post("/users", formInfo)
    const enterpriseId = loginResponse?.data?.data?.enterpriseId;
  if (enterpriseId) {
    const enterpriseResponse = await client.get(`/diligence/enterprise/${enterpriseId}`);
    localStorage.setItem("enterpriseInfo", JSON.stringify(enterpriseResponse?.data));
  }
    return loginResponse
}

export const signUp = async (formInfo: SignUpProps) => {
    const SignUpResponse = await client.post("/users/login", formInfo)
    const enterpriseId = SignUpResponse?.data?.data?.enterpriseId;
    if (enterpriseId) {
        const enterpriseResponse = await client.get(`/diligence/enterprise/${enterpriseId}`);
        localStorage.setItem("enterpriseInfo", JSON.stringify(enterpriseResponse?.data));
      }
    return SignUpResponse;
}

export const resetPassword = (formInfo: { password: string; token: string }) => {
    return client.post("/users/passwordreset", formInfo)
}

export const forgotPassword = (formInfo: {email:string}) => {
    return client.post("/users/passwordreset", formInfo)
}


