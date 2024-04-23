import { IFormInput } from "@/components/form/constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useCreateBusinessRequest,
  useCreateProductRequest,
  useUpdateProductRequest,
} from "@/services/business";
import {
  useGetCountries,
  useGetCountryServiceProduct,
  useGetProductById,
  useGetServiceForms,
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

  const productsRes = useGetCountryServiceProduct({ serviceId, country });
  const products = productsRes.data?.data?.data || [];
  const productsNames = products?.map((el) => el.name);

  const countriesRes = useGetCountries();
  const countriesData = countriesRes.data?.data?.data || [];
  const countriesNames = countriesData?.map((el) => el.name);

  const serviceFormsRes = useGetServiceForms(serviceId);
  const hasSForms = serviceFormsRes.data?.data?.data?.length ?? 0 > 0;

  const worldCountries = Object.keys(countries).map(
    (el: string) => countries[el as TCountryCode].name
  );
  const originalCountries = worldCountries.filter((el) =>
    countriesNames?.find((each) => each.toLowerCase() === el.toLowerCase())
  );

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
  const createProductRequest = useCreateProductRequest();
  const updateProductRequest = useUpdateProductRequest();
  const isPending =
    createBusinessRequest.isPending ||
    createProductRequest.isPending ||
    updateProductRequest.isPending;

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
    const businessId = searchParams.get("businessId") || "";
    const requestId = searchParams.get("requestId") || "";
    const productId = products?.find((el) => el.name === values.product)?.id || "";
    const addPath = hasSForms ? "/info" : "/payment";

    if (businessId) {
      if (requestId) {
        // Updates the product of a request
        updateProductRequest.mutate(
          { id: requestId, productId },
          {
            onSuccess: (data) => {
              const businessData = data.data.data;
              setQueriesWithPath({
                addPath,
                queries: [
                  { name: "productId", value: productId },
                  {
                    name: "requestId",
                    value: businessData.id,
                  },
                ],
              });
            },
          }
        );
        console.log("Updated the product of the request");
        return;
      }
      // Creates a product request with an existing business id
      createProductRequest.mutate(
        { businessId, productIds: [productId] },
        {
          onSuccess: (data) => {
            const requestData = data.data.data;
            setQueriesWithPath({
              addPath,
              queries: [
                { name: "productId", value: productId },
                { name: "progress", value: "1" },
                { name: "activePage", value: "1" },
                {
                  name: "requestId",
                  value: requestData.id,
                },
              ],
            });
          },
        }
      );
      console.log("Created a product with existing business id");
      return;
    }
    // Creates a business request
    createBusinessRequest.mutate(
      { userId, productId },
      {
        onSuccess: (data) => {
          const requestData = data.data.data;
          setQueriesWithPath({
            addPath,
            queries: [
              { name: "productId", value: productId },
              { name: "businessId", value: requestData.businessId },
              { name: "progress", value: "1" },
              { name: "activePage", value: "1" },
              {
                name: "requestId",
                value: requestData.id,
              },
            ],
          });
        },
      }
    );
    console.log("Created a business and a product request");
  };

  return { formInfo, handleFormSubmit, isPending, productInfo };
};
