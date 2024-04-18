import { IFormInput } from "@/components/form/constants";
import { useGetCountries, useGetCountryServiceProduct } from "@/services/service";
import { countries, TCountryCode } from "countries-list";
import { useState } from "react";

export const useActions = ({ serviceId }: { serviceId: string }) => {
  const [country, setCountry] = useState("");

  const countriesRes = useGetCountries();
  const countriesData = countriesRes.data?.data?.data || [];
  const countriesNames = countriesData?.map((el) => el.name);

  const worldCountries = Object.keys(countries).map(
    (el: string) => countries[el as TCountryCode].name
  );
  const originalCountries = worldCountries.filter((el) =>
    countriesNames?.find((each) => each.toLowerCase() === el.toLowerCase())
  );

  const productsRes = useGetCountryServiceProduct({ serviceId, country });
  const products = productsRes.data?.data?.data || [];
  const productsNames = products?.map((el) => el.name);

  const formInfo: IFormInput[] = [
    {
      name: "country",
      type: "select",
      label: "Select operational country",
      selectOptions: originalCountries,
      optionsLoading: countriesRes.isLoading,
      handleSelect: (selected) => selected && setCountry(selected),
    },
    {
      name: "product",
      type: "select",
      label: "Select product of your choice",
      selectOptions: productsNames,
      optionsLoading: productsRes.isLoading,
    },
  ];

  const handleFormSubmit = (values: Record<any, any>) => {
    console.log(values);
  };

  return { formInfo, handleFormSubmit, isPending: false };
};
