import { Client, rootType } from "../index";
import {
  IDocument,
  TBusinessDataFull,
  TCreateBusinessPayload,
  TCreateRequest,
  TCreateRequestPayload,
  TProductRequest,
} from "./types";

//
// BUSINESS ENDPOINTS
export const createBusinessRequest = async (payload: TCreateBusinessPayload) => {
  const client = await Client();
  return client.post<rootType<TCreateRequest>>("/businessRequest", payload);
};

export const getBusinessRequest = async ({ id }: { id: string }) => {
  const client = await Client();
  return client.get<rootType<TBusinessDataFull>>(`/businessRequest/${id}`);
};

export const getUserBusinessRequests = async ({ userId }: { userId: string }) => {
  const client = await Client();
  return client.get<rootType<TBusinessDataFull[]>>(`/businessRequest/user/${userId}`);
};

//
// PRODUCT REQUEST ENDPOINTS
export const createProductRequest = async (payload: TCreateRequestPayload) => {
  const client = await Client();
  return client.post<rootType<TCreateRequest[]>>("/businessRequest/requests", payload);
};

export const updateProductRequest = async ({
  id,
  productId,
}: {
  id: string;
  productId: string;
}) => {
  const client = await Client();
  return client.put<rootType<TCreateRequest>>(`/productRequest/product/${id}/${productId}`);
};

export const getProductRequest = async ({ productRequestId }: { productRequestId: string }) => {
  const client = await Client();
  return client.get<rootType<TProductRequest>>(`/productRequest/${productRequestId}`);
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

export const getbusinessDocuments = async ({ businessId }: { businessId: string }) => {
  const client = await Client();
  return client.get(`/userDocument/process/${businessId}`);
};

export const getRequestDocuments = async ({ requestId }: { requestId: string }) => {
  const client = await Client();
  return client.get<rootType<IDocument[]>>(`/userDocument/request/${requestId}`);
};
