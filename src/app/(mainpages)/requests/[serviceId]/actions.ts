import { IFormInput } from "@/components/form/constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import {
  useCreateBusinessRequest,
  useCreateProductRequest,
  useGetProductRequest,
  useUpdateProductRequest,
} from "@/services/business";
import { TCreateRequest } from "@/services/business/types";
import { useGetCountries, useGetServiceForms } from "@/services/service";
import {
  useGetProductById,
  useGetProductForms,
  useGetCountryServiceProduct,
} from "@/services/product";
import { countries, TCountryCode } from "countries-list";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";

export const formSchema = z.object({
  country: z
    .string({ required_error: "You need to select a country" })
    .min(1, { message: "You need to select a country" }),
  product: z
    .string({ required_error: "You need to select a product" })
    .min(1, { message: "You need to select a product" }),
});

// ACTIONS
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

  // Check service and product forms
  const productFormsRes = useGetProductForms(productInfo?.id || "");
  const hasPForms = (productFormsRes.data?.data?.data?.length ?? 0) > 0;
  const serviceFormsRes = useGetServiceForms(serviceId);
  const hasSForms = (serviceFormsRes.data?.data?.data?.length ?? 0) > 0;

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
      options: originalCountries,
      optionsLoading: countriesRes.isLoading,
      optionsErrorMsg: countriesRes.error?.message,
      value: country,
      handleSelect: (selected) => selected && setCountry(selected),
    },
    {
      name: "product",
      type: "select",
      label: "Select a product of your choice",
      options: productsNames,
      optionsLoading: productsRes.isLoading,
      optionsErrorMsg: productsRes.error?.message,
      value: selectedProduct,
      handleSelect: (selected) => selected && setSelectedProduct(selected),
    },
  ];

  const productRequestRes = useGetProductRequest(searchParams.get("requestId") || "");
  const productRequest = productRequestRes.data?.data?.data;

  // Creates or updates a business
  const handleFormSubmit = ({ values }: { values: z.infer<typeof formSchema> }) => {
    const businessId = searchParams.get("businessId") || "";
    const requestId = searchParams.get("requestId") || "";
    const productId = products?.find((el) => el.name === values.product)?.id || "";
    const addPath = hasSForms ? "/info" : productRequest?.paid ? "/info" : "/payment";

    // Returns the queries to be set to the url
    const getQueries = (requestData: TCreateRequest, action?: string) => {
      let queries = [
        { name: "productId", value: productId },
        { name: "requestId", value: requestData.id },
        { name: "hasSForms", value: hasSForms.toString() },
        { name: "hasPForms", value: hasPForms.toString() },
      ];
      if (hasSForms) {
        queries = [...queries, { name: "activeTab", value: "0" }];
      }
      if (action === "createReq" || action === "createBusiness") {
        queries = [...queries, { name: "progress", value: "1" }];
      }
      if (action === "createBusiness") {
        queries = [...queries, { name: "businessId", value: requestData.businessId }];
      }
      return queries;
    };

    if (businessId) {
      if (requestId) {
        // Updates the product of a request
        updateProductRequest.mutate(
          { id: requestId, productId },
          {
            onSuccess: (data) => {
              const requestData = data.data.data;
              setQueriesWithPath({
                addPath,
                queries: getQueries(requestData),
              });
              console.log("Updated the product of the request");
            },
          }
        );
        return;
      }
      // Creates a product request with an existing business id
      createProductRequest.mutate(
        { businessId, productIds: [productId] },
        {
          onSuccess: (data) => {
            const requestData = data.data.data?.[0];
            setQueriesWithPath({
              addPath,
              queries: getQueries(requestData, "createReq"),
            });
            console.log("Created a product with existing business id");
          },
        }
      );

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
            queries: getQueries(requestData, "createBusiness"),
          });
          console.log("Created a business and a product request");
        },
      }
    );
  };

  return { formInfo, handleFormSubmit, isPending, productInfo };
};
