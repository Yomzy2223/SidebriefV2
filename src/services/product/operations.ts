import { Client, rootType } from "../index";
import {
  productType,
  saveProductQAPayload,
  productQAType,
  addServiceToProductPayload,
  productFormType,
  updateProductQAPayload,
  deleteProductQAPayload,
} from "./types";

export const saveProductQA = async ({ productId, form }: saveProductQAPayload) => {
  const client = await Client();
  return client.post<rootType<productQAType[]>>(`/productRequest/form/${productId}`, form);
};

export const updateProductQA = async ({ requestFormId, form }: updateProductQAPayload) => {
  const client = await Client();
  return client.put<rootType<productQAType[]>>(`/productRequest/form/${requestFormId}`, form);
};

export const deleteProductQA = async ({ requestFormId }: deleteProductQAPayload) => {
  const client = await Client();
  return client.delete<rootType<productQAType[]>>(`/productRequest/form/${requestFormId}`);
};

export const getproductQA = async ({ productId }: { productId: string | undefined }) => {
  const client = await Client();
  return client.get<rootType<productQAType[]>>(`/productRequest/form/${productId}`);
};

export const addServiceToProduct = async ({ productId, serviceId }: addServiceToProductPayload) => {
  const client = await Client();
  return client.post<rootType<productType>>("/product/serviceId", {
    serviceId,
    productId,
  });
};

export const getProductRequest = async ({ productRequestId }: { productRequestId: string }) => {
  const client = await Client();
  return client.get<rootType<productType>>(`/productRequest/${productRequestId}`);
};

export const getProductForm = async ({ productId }: { productId: string }) => {
  const client = await Client();
  return client.get<rootType<productFormType[]>>(`/products/formByProduct/${productId}`);
};
