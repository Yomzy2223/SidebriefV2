import { axios, rootType } from "../index";
import { ProcessData, createProcessPayload, BusinessDataType } from "./types";

export const createNewBusinessRequest = (payload: createProcessPayload) =>
  axios.post<rootType<BusinessDataType>>("/businessRequest", payload);

export const GetBusinessRequest = ({ id }: { id: string }) =>
  axios.get<rootType<ProcessData>>(`/businessRequest/${id}`);
