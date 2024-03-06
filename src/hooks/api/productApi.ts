import { Client } from "@/lib/axios";

// Product endpoints
export const getProduct = async (id: string) => {
  const client = await Client();
  return await client.get(`/products/${id}`);
};

export const getServiceProducts = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/products/service/${serviceId}`);
};

// Product form endpoints
export const getProductForm = async (productId: string) => {
  const client = await Client();
  return await client.get(`/products/formByProduct/${productId}`);
};

export const getServiceProductForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/products/form/${serviceId}`);
};

// Product sub-form endpoints
export const getProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/products/subform/${id}`);
};

export const getProductSubForms = async (formId: string) => {
  const client = await Client();
  return await client.get(`/products/subforms/${formId}`);
};
