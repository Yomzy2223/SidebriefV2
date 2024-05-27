import React from "react";
import SuggestionCard from "./suggestionCard";
import { useGetProductSuggestions } from "@/services/product";
import { useGetBusinessRequest, useGetProductRequest } from "@/services/business";
import { Loader } from "./suggestionLoader";

const SuggestionSection = ({ selectedBusiness }: { selectedBusiness: string }) => {
  // console.log(selectedBusiness);
  const getBusinessRequest = useGetBusinessRequest({ id: selectedBusiness });

  const businessRequest = getBusinessRequest.data?.data.data;

  const productRequestId = businessRequest?.productRequest[0].id;

  const getProductRequest = useGetProductRequest(productRequestId || "");

  const productRequest = getProductRequest.data?.data.data;

  const objectives = productRequest?.product.otherExpectedRequest || [];

  const getProductSuggestions = useGetProductSuggestions({ objectives });

  const productSuggestions = getProductSuggestions.data?.data.data || [];

  const loading =
    getBusinessRequest.isLoading || getProductRequest.isLoading || getProductSuggestions.isLoading;

  const suggestions = productSuggestions.map((el) => ({
    title: el.name,
    description: el.description,
    guideLink: "",
  }));

  return (
    <div className="flex gap-4 max-w-full overflow-auto">
      {loading
        ? Array(4).fill(<Loader />)
        : suggestions.map((el) => (
            <SuggestionCard
              key={el.title}
              title={el.title}
              description={el.description}
              guideLink={el?.guideLink || ""}
            />
          ))}
    </div>
  );
};

export default SuggestionSection;
