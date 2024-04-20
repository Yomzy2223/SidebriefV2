import { Client } from "@/lib/axios";
import { IRequest } from "./types";

// Request endpoints
export const createRequest = async (formInfo: IRequest) => {
  const client = await Client();
  return await client.post("/productRequest", formInfo);
};

export const updateProductRequest = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: IRequest;
}) => {
  const client = await Client();
  return await client.put(`/productRequest${id}`, formInfo);
};

export const deleteRequest = async (id: string) => {
  const client = await Client();
  return await client.delete(`/productRequest${id}`);
};

export const getUserRequests = async (userId: string) => {
  const client = await Client();
  return await client.get(`/productRequest/user/${userId}`);
};

export const getRequest = async (id: string) => {
  const client = await Client();
  return await client.get(`/productRequest/${id}`);
};
