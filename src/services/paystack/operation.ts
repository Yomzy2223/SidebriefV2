import axios from "axios";

export const verifyPaystackPayment = ({ reference }: { reference: string }) => {
  return axios.get(`https://api.paystack.co/transaction/verify/${reference}`);
};
