import React from "react";
import { DocumentComponent } from "./documents";
import { Member } from "./members";
import { SectionWrapper } from "./sectionWrapper";
import Activity from "@/components/dashboard/businessMembersSection/activiity";

const BusinessMembersSection = ({ selectedBusiness }: { selectedBusiness: string }) => {
  return (
    <div className="grid mt-4 w-full gap-3 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))]">
      <SectionWrapper title="Members" morelink="/" businessId={selectedBusiness}>
        <Member businessId={selectedBusiness} />
      </SectionWrapper>

      <SectionWrapper title="Documents" morelink="/" businessId={selectedBusiness}>
        <DocumentComponent businessId={selectedBusiness} />
      </SectionWrapper>

      {/* <SectionWrapper title="My Activities" businessId={selectedBusiness}>
        <Activity />
      </SectionWrapper> */}
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
