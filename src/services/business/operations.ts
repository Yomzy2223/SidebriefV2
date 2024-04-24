import { axios, rootType } from "../index";
import { ProcessData, createProcessPayload, ProductRequestType } from "./types";
import { Client } from "@/lib/axios";

export const createNewBusinessRequest = (payload: createProcessPayload) =>
  axios.post<rootType<ProductRequestType>>("/businessRequest", payload);

export const GetBusinessRequest = ({ id }: { id: string }) =>
  axios.get<rootType<ProcessData>>(`/businessRequest/${id}`);

export const GetUserBusinessRequests = async ({ userId }: { userId: string }) => {
  const client = await Client();
  return client.get<rootType<ProcessData[]>>(`/businessRequest/user/${userId}`);
};
