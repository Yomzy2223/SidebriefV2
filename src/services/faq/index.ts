import { useQuery } from "@tanstack/react-query";
import { getAllFAQs, getFAQ, getProductFAQs, getServiceFAQs } from "./operations";

export const useGetFAQQuery = (id: string) =>
  useQuery({
    queryKey: ["FAQ", id],
    queryFn: ({ queryKey }) => getFAQ(queryKey[1]),
    enabled: !!id,
  });

export const useGetProductFAQsQuery = ({
  productId,
  requestState,
}: {
  productId: string;
  requestState: string;
}) =>
  useQuery({
    queryKey: ["FAQ", productId, requestState],
    queryFn: ({ queryKey }) =>
      getProductFAQs({ productId: queryKey[1], requestState: queryKey[2] }),
    enabled: !!productId,
  });

export const useGetServiceFAQsQuery = (serviceId: string) =>
  useQuery({
    queryKey: ["FAQ", serviceId],
    queryFn: ({ queryKey }) => getServiceFAQs(queryKey[1]),
    enabled: !!serviceId,
  });

export const useGetAllFAQsQuery = () =>
  useQuery({
    queryKey: ["FAQ"],
    queryFn: getAllFAQs,
  });
