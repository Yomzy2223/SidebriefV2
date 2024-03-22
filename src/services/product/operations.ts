import { axios, rootType } from "../index";
import {
  productType,
  saveProductQAPayload,
  productQAType,
  addServiceToProductPayload,
  productFormType,
  updateProductQAPayload,
} from "./types";

export const saveProductQA = ({ productId, form }: saveProductQAPayload) =>
  axios.post<rootType<productQAType[]>>(`/productRequest/form/${productId}`, form);

export const updateProductQA = ({ requestFormId, form }: updateProductQAPayload) =>
  axios.put<rootType<productQAType[]>>(`/productRequest/form/${requestFormId}`, form);

export const getproductQA = ({ productId }: { productId: string | undefined }) =>
  axios.get<rootType<productQAType[]>>(`/productRequest/form/${productId}`);

export const addServiceToProduct = ({ productId, serviceId }: addServiceToProductPayload) =>
  axios.post<rootType<productType>>("/product/serviceId", {
    serviceId,
    productId,
  });

export const getProductRequest = ({ productRequestId }: { productRequestId: string }) =>
  axios.get<rootType<productType>>(`/productRequest/${productRequestId}`);

export const getProductForm = ({ productId }: { productId: string }) =>
  axios.get<rootType<productFormType[]>>(`/products/formByProduct/${productId}`);
