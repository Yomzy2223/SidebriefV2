import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { StaticImageData } from "next/image";
import Activity from "@/components/activiity";
import {
  SectionWrapper,
  DocumentComponent,
  Proprietor,
} from "@/components/dashboard/businessMembersSection";
import { Services } from "./services";
import WelcomeSection from "@/components/dashboard/welcomeSection";
import HandpickedSection from "@/components/dashboard/handpickedSection";

interface File {
  id?: string;
  name: string;
  type: string;
}

interface FeatureProps {
  name: string;
  description: string;
  icon: StaticImageData;
}

interface BadgeProps {
  size?: "sm" | "lg";
  status: "Pending" | "Ongoing" | "Completed" | "Submitted";
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

const ApplicationBadge: React.FC<BadgeProps> = ({ size = "sm", status }) => {
  let badgeColor = "";

  switch (status) {
    case "Pending":
      badgeColor = "red";
      break;
    case "Ongoing":
      badgeColor = "yellow";
      break;
    case "Completed":
      badgeColor = "pink";
      break;
    case "Submitted":
      badgeColor = "green";
      break;
    default:
      badgeColor = "gray";
  }

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold text-${badgeColor}-800 bg-${badgeColor}-400 rounded first-letter:uppercase ${
        size === "sm" ? "text-sm" : "text-xs"
      }`}
    >
      {status || ""}
    </span>
  );
};

export default function Dashboard() {
  return (
    <div className="p-5 space-y-14 md:p-8">
      <WelcomeSection />
      <HandpickedSection />
      {/* <div className="flex flex-col sm:flex-row">
        <div className="px-0 sm:px-0">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Contifery agricultural limited
            </h1>
            <span className="ml-2">
              <ApplicationBadge size="lg" status="Pending" />
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Now continue the process of registering your business without the need for any physical
            paperwork.
          </p>
        </div>

        <div className="sm:hidden w-full mt-6">
          <Button color="secondary" size={"lg"} className="self-start">
            <div className="space-x-2 flex items-center">
              <p>Resume</p>
              <ArrowRight />
            </div>
          </Button>
        </div>
      </div> */}

      {/* <div className="hidden sm:block">
        <Button color="magenta" size={"lg"} className="mr-7 self-start mt-8 absolute top-0 right-0">
          <div className="space-x-2 flex items-center">
            <p>Resume</p>
            <ArrowRight />
          </div>
        </Button>
      </div> */}

      <div className="flex flex-col md:flex-row mt-4 w-full gap-3">
        <SectionWrapper title="Proprietors" morelink="">
          <Proprietor proprietors={[]} />
        </SectionWrapper>

        <SectionWrapper title="Documents" morelink="">
          <div className="pl-7 pr-8">
            <DocumentComponent files={files} />
          </div>
        </SectionWrapper>

        <SectionWrapper title="My Activities" morelink="">
          <Activity />
        </SectionWrapper>
      </div>

      <Services />
    </div>
  );
}
