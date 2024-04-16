import {
  getAllServices,
  getService,
  getServiceForm,
  getServiceForms,
  getServiceSubForm,
  getServiceSubForms,
} from "@/hooks/api/serviceApi";
import { useQuery } from "@tanstack/react-query";

const useServiceApi = () => {
  const useGetServiceQuery = (id: string) =>
    useQuery({
      queryKey: ["service", id],
      queryFn: ({ queryKey }) => getService(queryKey[1]),
      enabled: id ? true : false,
    });

  const getAllServicesQuery = useQuery({
    queryKey: ["service"],
    queryFn: getAllServices,
  });

  const useGetServiceFormQuery = (id: string) =>
    useQuery({
      queryKey: ["Service Form", id],
      queryFn: ({ queryKey }) => getServiceForm(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetServiceFormsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["Service Form", serviceId],
      queryFn: ({ queryKey }) => getServiceForms(queryKey[1]),
      enabled: serviceId ? true : false,
    });

  const useGetServiceSubFormQuery = (id: string) =>
    useQuery({
      queryKey: ["Service Form", id],
      queryFn: ({ queryKey }) => getServiceSubForm(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetServiceSubFormsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["Service Form", serviceId],
      queryFn: ({ queryKey }) => getServiceSubForms(queryKey[1]),
      enabled: serviceId ? true : false,
    });

  return {
    useGetServiceQuery,
    getAllServicesQuery,
    useGetServiceFormQuery,
    useGetServiceFormsQuery,
    useGetServiceSubFormQuery,
    useGetServiceSubFormsQuery,
  };
};

export default useServiceApi;
