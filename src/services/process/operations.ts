import { axios, rootType } from "../index";
import { IBusinessData, ICreateBusinessPayload, ICreateRequestPayload } from "./types";

export const createBusinessRequest = (payload: ICreateBusinessPayload) =>
  axios.post<rootType<IBusinessData>>("/businessRequest", payload);

export const createProductRequest = (payload: ICreateRequestPayload) =>
  axios.post<rootType<IBusinessData>>("/businessRequest/requests", payload);

export const getBusinessRequest = ({ id }: { id: string }) =>
  axios.get<rootType<IBusinessData>>(`/businessRequest/${id}`);

export const getUserBusinessRequests = ({ userId }: { userId: string }) =>
  axios.get<rootType<IBusinessData[]>>(`/businessRequest/user/${userId}`);
