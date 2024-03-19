import React from "react";
import SuggestionCard from "./suggestionCard";

const SuggestionSection = () => {
  return (
    <div className="flex gap-4 max-w-full overflow-auto">
      {suggestions.map((el) => (
        <SuggestionCard
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
