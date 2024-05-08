import React from "react";
import SuggestionCard from "./suggestionCard";
import { useGetProductSuggestions } from "@/services/service";
import { useGetBusinessRequest, useGetProductRequest } from "@/services/business";

const SuggestionSection = ({ selectedBusiness }: { selectedBusiness: string }) => {
  // console.log(selectedBusiness);
  const getBusinessRequest = useGetBusinessRequest({ id: selectedBusiness });

  const businessRequest = getBusinessRequest.data?.data.data;

  const productRequestId = businessRequest?.productRequest[0].id;

  const getProductRequest = useGetProductRequest(productRequestId || "");

  const productRequest = getProductRequest.data?.data.data;

  const objectives = productRequest?.product.otherExpectedRequest || [];

  const getProductSuggestions = useGetProductSuggestions({ objectives });

  const productSuggestions = getProductSuggestions.data?.data.data;

  // if (productSuggestions) console.log(productSuggestions);

  // console.log(getProductSuggestions.isLoading, getProductSuggestions.error);

  return (
    <div className="flex gap-4 max-w-full overflow-auto">
      {suggestions.map((el) => (
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

const suggestions = [
  {
    title: "Business Registration",
    description:
      "Go to this step by step guideline process on how to certify for your weekly benefits:",
  },
  {
    title: "Tax",
    description:
      "Go to this step by step guideline process on how to certify for your weekly benefits:",
    guideLink: "/",
  },
  {
    title: "Bank Account",
    description:
      "Go to this step by step guideline process on how to certify for your weekly benefits:",
    guideLink: "/",
  },
  {
    title: "Intellectual Properties",
    description:
      "Go to this step by step guideline process on how to certify for your weekly benefits:",
    guideLink: "/",
  },
  {
    title: "Work Permit",
    description:
      "Go to this step by step guideline process on how to certify for your weekly benefits:",
    guideLink: "/",
  },
];
