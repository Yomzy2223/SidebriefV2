import { axios, rootType } from "../index";
import { TBusinessDataFull, TCreateBusinessPayload, TCreateRequestPayload } from "./types";

export const createBusinessRequest = (payload: TCreateBusinessPayload) =>
  axios.post<rootType<TBusinessDataFull>>("/businessRequest", payload);

export const updateBusinessRequest = ({
  id,
  payload,
}: {
  id: string;
  payload: TCreateBusinessPayload;
}) => axios.post<rootType<TBusinessDataFull>>(`/businessRequest/${id}`, payload);

export const createProductRequest = (payload: TCreateRequestPayload) =>
  axios.post<rootType<TBusinessDataFull>>("/businessRequest/requests", payload);

export const getBusinessRequest = ({ id }: { id: string }) =>
  axios.get<rootType<TBusinessDataFull>>(`/businessRequest/${id}`);

export const getUserBusinessRequests = ({ userId }: { userId: string }) =>
  axios.get<rootType<TBusinessDataFull[]>>(`/businessRequest/user/${userId}`);
