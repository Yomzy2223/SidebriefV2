import React from "react";
import { DocumentComponent } from "./documents";
import { Member } from "./members";
import { SectionWrapper } from "./sectionWrapper";
import { TBusinessDataFull } from "@/services/business/types";

const BusinessMembersSection = ({
  businessRequest,
  isLoading,
}: {
  businessRequest?: TBusinessDataFull;
  isLoading: boolean;
}) => {
  return (
    <div className="grid mt-4 w-full gap-3 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))]">
      <SectionWrapper title="Members" morelink="/" businessRequest={businessRequest}>
        <Member businessRequest={businessRequest} isLoading={isLoading} />
      </SectionWrapper>

      <SectionWrapper title="Documents" morelink="/" businessRequest={businessRequest}>
        <DocumentComponent businessRequest={businessRequest} isLoading={isLoading} />
      </SectionWrapper>

      {/* <SectionWrapper title="My Activities" businessId={selectedBusiness}>
        <Activity />
      </SectionWrapper> */}
    </div>
  );
};

export default BusinessMembersSection;

function getInitials(name: string): string {
  if (!name) {
    return "";
  }

  const words = name.trim().split(/\s+/);

  let initials = "";

  for (let i = 0; i < 2 && i < words.length; i++) {
    const word = words[i];

    const initial = word.charAt(0).toUpperCase();

    initials += initial;
  }

  return initials;
}

interface IFile {
  id?: string;
  name: string;
  type: string;
}
interface IFiles {
  received: IFile[];
  uploaded: IFile[];
}
