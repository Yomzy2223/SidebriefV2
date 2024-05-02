import { Client, rootType } from "../index";
import {
  saveRequestQAPayload,
  updateRequestQAPayload,
  deleteRequestQAPayload,
  TFormQACreate,
  TFormQAGet,
  multipleQASubFormsPayload,
} from "./types";

export const saveRequestQA = async ({ requestId, formId, form }: saveRequestQAPayload) => {
  const client = await Client();
  return client.post<rootType<TFormQAGet[]>>(`/productRequest/form/${formId}/${requestId}`, form);
};

export const updateRequestQA = async ({ requestFormId, form }: updateRequestQAPayload) => {
  const client = await Client();
  return client.put<rootType<TFormQAGet[]>>(`/productRequest/form/${requestFormId}`, form);
};

export const deleteRequestQA = async ({ requestFormId }: deleteRequestQAPayload) => {
  const client = await Client();
  return client.delete<rootType>(`/productRequest/form/${requestFormId}`);
};

export const getRequestQA = async ({ requestId }: { requestId: string }) => {
  const client = await Client();
  return client.get<rootType<TFormQAGet[]>>(`/productRequest/form/${requestId}`);
};

export const getRequestFormQA = async ({
  formId,
  requestId,
}: {
  formId: string;
  requestId: string;
}) => {
  const client = await Client();
  return client.get<rootType<TFormQAGet[]>>(`/productRequest/formByFormId/${formId}/${requestId}`);
};

export const saveMultipleQASubForms = async ({ formId, form }: multipleQASubFormsPayload) => {
  const client = await Client();
  return client.post<rootType<TFormQAGet[]>>(`/productRequest/multiple/subForm/${formId}`, form);
};
