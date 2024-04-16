import { useQuery } from "@tanstack/react-query";
import { getCountries, getCountry } from "./api/countryApi";

export const useCountryApi = () => {
  const useGetCountryQuery = (id: string) =>
    useQuery({
      queryKey: ["country", id],
      queryFn: ({ queryKey }) => getCountry(queryKey[1]),
      enabled: id ? true : false,
    });

  const getAllCountriesQuery = useQuery({
    queryKey: ["country"],
    queryFn: getCountries,
  });

  return {
    useGetCountryQuery,
    getAllCountriesQuery,
  };
};
