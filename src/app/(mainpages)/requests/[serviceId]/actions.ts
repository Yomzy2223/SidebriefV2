import { IFormInput } from "@/components/form/constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useCreateBusinessRequest, useUpdateBusinessRequest } from "@/services/business";
import { TCreateBusinessPayload } from "@/services/business/types";
import {
  useGetCountries,
  useGetCountryServiceProduct,
  useGetProductById,
} from "@/services/service";
import { countries, TCountryCode } from "countries-list";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";
import { formSchema } from "./page";

export const useActions = ({ serviceId }: { serviceId: string }) => {
  const [country, setCountry] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const searchParams = useSearchParams();

  const { setQueriesWithPath } = useGlobalFunctions();
  const session = useSession();
  const userId = session.data?.user?.id;

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

  // Populate the previously selected country and product
  const productRes = useGetProductById(searchParams.get("productId") || "");
  const product = productRes.data?.data?.data;
  useEffect(() => {
    if (product) {
      const country =
        worldCountries.find((el) => el.toLowerCase() === product.country.toLowerCase()) || "";
      setCountry(country);
      setSelectedProduct(product.name);
    }
  }, [product]);

  const productInfo = products?.find((el) => el.name === selectedProduct);

  const createBusinessRequest = useCreateBusinessRequest();
  const updateBusinessRequest = useUpdateBusinessRequest();

  const formInfo: IFormInput[] = [
    {
      name: "country",
      type: "select",
      label: "Select an operational country",
      selectOptions: originalCountries,
      optionsLoading: countriesRes.isLoading,
      optionsErrorMsg: countriesRes.error?.message,
      value: country,
      handleSelect: (selected) => selected && setCountry(selected),
    },
    {
      name: "product",
      type: "select",
      label: "Select a product of your choice",
      selectOptions: productsNames,
      optionsLoading: productsRes.isLoading,
      optionsErrorMsg: productsRes.error?.message,
      value: selectedProduct,
      handleSelect: (selected) => selected && setSelectedProduct(selected),
    },
  ];

  // Creates or updates a business
  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const productId = products?.find((el) => el.name === values.product)?.id || "";
    const businessId = searchParams.get("businessId");

    if (businessId) {
      updateBusinessRequest.mutate(
        { id: businessId, payload: { userId, productId } },
        {
          onSuccess: (data) => {
            setQueriesWithPath({
              addPath: "/info",
              queries: [{ name: "productId", value: productId }],
            });
          },
        }
      );
      return;
    }
    createBusinessRequest.mutate(
      { userId, productId },
      {
        onSuccess: (data) => {
          const businessData = data.data.data;
          setQueriesWithPath({
            addPath: "/info",
            queries: [
              { name: "productId", value: productId },
              { name: "businessId", value: businessData.id },
              { name: "progress", value: "1" },
            ],
          });
        },
      }
    );
  };

  return { formInfo, handleFormSubmit, createBusinessRequest, productInfo };
};
