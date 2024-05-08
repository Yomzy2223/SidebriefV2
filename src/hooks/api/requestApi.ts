import { Client } from "@/lib/axios";
import { IRequest } from "./types";

// Request endpoints
export const updateRequest = async ({ id, formInfo }: { id: string; formInfo: IRequest }) => {
  const client = await Client();
  return await client.put(`/productRequest${id}`, formInfo);
};

export const deleteRequest = async (id: string) => {
  const client = await Client();
  return await client.delete(`/productRequest${id}`);
};

export const getRequest = async (id: string) => {
  const client = await Client();
  return await client.get(`/productRequest/${id}`);
};

export const getServiceRequests = async ({
  serviceId,
  page,
  pageSize,
}: {
  serviceId: string;
  page?: number | string;
  pageSize?: number | string;
}) => {
  const client = await Client();
  return await client.get(`/productRequest/service/${serviceId}?page=${page}&pageSize=${pageSize}`);
};

export const getAllRequests = async ({
  page,
  pageSize,
}: {
  page?: number | string;
  pageSize?: number | string;
}) => {
  const client = await Client();
  let endpoint = `/productRequest`;
  if (page && pageSize) endpoint = `/productRequest?page=${page}&pageSize=${pageSize}`;
  return await client.get(endpoint);
};

export const getRequestForm = async (requestId: string) => {
  const client = await Client();
  return await client.get(`/productRequest/form/${requestId}`);
};

export const getBusinessDetails = async (requestId: string) => {
  const client = await Client();
  return await client.get(`/processRequest/request/${requestId}`);
};

export const assignRequest = async ({
  formInfo,
}: {
  formInfo: {
    userId: string;
    requestIds: string[];
  };
}) => {
  const client = await Client();
  return await client.post(`/productRequest/assign`, formInfo);
};

export const unAssignRequest = async ({
  formInfo,
}: {
  formInfo: {
    userId: string;
    requestIds: string[];
  };
}) => {
  const client = await Client();
  return await client.put(`/productRequest/unassign`, formInfo);
};

export const searchRequest = async ({
  formInfo,
}: {
  formInfo: {
    queryString: string;
    serviceId: string;
  };
}) => {
  const client = await Client();
  return await client.post(`/productRequest/search`, formInfo);
};

// Request form endpoints
