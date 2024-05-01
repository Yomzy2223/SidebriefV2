import React from "react";
import { DocumentComponent } from "./documents";
import { Member } from "./members";
import { SectionWrapper } from "./sectionWrapper";
import Activity from "@/components/dashboard/businessMembersSection/activiity";

const BusinessMembersSection = ({ selectedBusiness }: { selectedBusiness: string }) => {
  return (
    <div className="grid mt-4 w-full gap-3 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))]">
      <SectionWrapper title="Members" morelink="/">
        <Member businessId={selectedBusiness} />
      </SectionWrapper>

      <SectionWrapper title="Documents" morelink="/">
        <DocumentComponent files={files} />
      </SectionWrapper>

      <SectionWrapper title="My Activities">
        <Activity />
      </SectionWrapper>
    </div>
  );
};

export default BusinessMembersSection;

interface IFile {
  id?: string;
  name: string;
  type: string;
}
interface IFiles {
  received: IFile[];
  uploaded: IFile[];
}

const files: IFiles = {
  received: [
    {
      id: "1",
      name: "Statement of aaccount",
      type: "application/pdf",
    },

    {
      id: "2",
      name: "National ID Card",
      type: "image/png",
    },
    {
      id: "3",
      name: "Statemaent of account",
      type: "application/pdf",
    },

    {
      id: "2",
      name: "National ID Card",
      type: "image/png",
    },
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
      id: "1",
      name: "Statement of account",
      type: "application/pdf",
    },

    {
      id: "2",
      name: "National ID Card",
      type: "image/png",
    },
  ],
  uploaded: [
    {
      id: "11",
      name: "Statemt of account",
      type: "application/pdf",
    },

    {
      id: "12",
      name: "Natiol ID Card",
      type: "image/png",
    },
  ],
};
