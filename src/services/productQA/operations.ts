import { Client, rootType } from "../index";
import {
  saveProductQAPayload,
  updateProductQAPayload,
  deleteProductQAPayload,
  TFormQACreate,
} from "./types";

export const saveProductQA = async ({ requestId, form }: saveProductQAPayload) => {
  const client = await Client();
  return client.post<rootType<TFormQACreate[]>>(`/productRequest/form/${requestId}`, form);
};

export const updateProductQA = async ({ requestFormId, form }: updateProductQAPayload) => {
  const client = await Client();
  return client.put<rootType<TFormQACreate[]>>(`/productRequest/form/${requestFormId}`, form);
};

export const deleteProductQA = async ({ requestFormId }: deleteProductQAPayload) => {
  const client = await Client();
  return client.delete<rootType<TFormQACreate[]>>(`/productRequest/form/${requestFormId}`);
};

export const getproductQA = async ({ productId }: { productId: string | undefined }) => {
  const client = await Client();
  return client.get<rootType<TFormQACreate[]>>(`/productRequest/form/${productId}`);
};
