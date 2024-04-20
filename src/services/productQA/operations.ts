import { Client, rootType } from "../index";
import {
  saveRequestQAPayload,
  updateRequestQAPayload,
  deleteRequestQAPayload,
  TFormQACreate,
  TFormQAGet,
} from "./types";

export const saveRequestQA = async ({ requestId, formId, form }: saveRequestQAPayload) => {
  const client = await Client();
  return client.post<rootType<TFormQACreate[]>>(
    `/productRequest/form/${formId}/${requestId}`,
    form
  );
};

export const updateRequestQA = async ({ requestFormId, form }: updateRequestQAPayload) => {
  const client = await Client();
  return client.put<rootType<TFormQACreate[]>>(`/productRequest/form/${requestFormId}`, form);
};

export const deleteRequestQA = async ({ requestFormId }: deleteRequestQAPayload) => {
  const client = await Client();
  return client.delete<rootType<TFormQACreate[]>>(`/productRequest/form/${requestFormId}`);
};

export const getRequestQA = async ({ requestId }: { requestId: string }) => {
  const client = await Client();
  return client.get<rootType<TFormQAGet[]>>(`/productRequest/form/${requestId}`);
};
