import { Client } from "@/lib/axios";

export const getService = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/${id}`);
};

export const getAllServices = async () => {
  const client = await Client();
  return await client.get(`/services`);
};

export const getServiceForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/form/${id}`);
};

export const getServiceForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/services/forms/${serviceId}`);
};

export const getServiceSubForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/subform/${id}`);
};

export const getServiceSubForms = async (formId: string) => {
  const client = await Client();
  return await client.get(`/services/subforms/${formId}`);
};
