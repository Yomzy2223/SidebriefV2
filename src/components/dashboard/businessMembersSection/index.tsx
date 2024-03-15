import React from "react";
import { DocumentComponent } from "./documents";
import { Proprietor } from "./proprietors";
import { SectionWrapper } from "./sectionWrapper";
import Activity from "@/components/activiity";

const BusinessMembersSection = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row mt-4 w-full gap-3">
        <SectionWrapper title="Proprietors" morelink="/">
          <Proprietor />
        </SectionWrapper>

        <SectionWrapper title="Documents" morelink="/">
          <div className="pl-7 pr-8">
            <DocumentComponent files={files} />
          </div>
        </SectionWrapper>

        <SectionWrapper title="My Activities">
          <Activity />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default BusinessMembersSection;

interface File {
  id?: string;
  name: string;
  type: string;
}

const files: File[] = [
  {
    id: "1",
    name: "Statement of account",
    type: "application/pdf",
  },

  {
    id: "2",
    name: "National ID Card",
    type: "image/png",
  },

  {
    id: "3",
    name: "Passport photograph",
    type: "image/jpeg",
  },

  {
    id: "4",
    name: "Proof of Address",
    type: "image/png",
  },
];
