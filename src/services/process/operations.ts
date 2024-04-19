import { axios, rootType } from "../index";
import { ProcessData, createProcessPayload } from "./types";

export const createNewProcessRequest = (payload: createProcessPayload) =>
  axios.post<rootType<ProcessData>>("/businessRequest", payload);

export const GetProcessRequest = ({ id }: { id: string }) =>
  axios.get<rootType<ProcessData>>(`/businessRequest/${id}`);
