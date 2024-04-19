import { Client, rootType } from "../index";
import { TProductForm } from "../service/types";
import {
  saveProductQAPayload,
  updateProductQAPayload,
  deleteProductQAPayload,
  TFormQACreate,
  TProductRequest,
} from "./types";

export const saveProductQA = async ({ productId, form }: saveProductQAPayload) => {
  const client = await Client();
  return client.post<rootType<TFormQACreate[]>>(`/productRequest/form/${productId}`, form);
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

export const getProductRequest = async ({ productRequestId }: { productRequestId: string }) => {
  const client = await Client();
  return client.get<rootType<TProductRequest>>(`/productRequest/${productRequestId}`);
};

export const getProductForm = async ({ productId }: { productId: string }) => {
  const client = await Client();
  return client.get<rootType<TProductForm[]>>(`/products/formByProduct/${productId}`);
};

export const submitProductRequest = async ({
  productRequestIds,
}: {
  productRequestIds: string[];
}) => {
  const client = await Client();
  return client.post<rootType<any>>(`/productRequest/submission`, {
    requestIds: productRequestIds,
  });
};
