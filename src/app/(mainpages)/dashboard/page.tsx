"use client";

import WelcomeSection from "@/components/dashboard/welcomeSection";
import HandpickedSection from "@/components/dashboard/handpickedSection";
import BusinessMembersSection from "@/components/dashboard/businessMembersSection";
import BusinessInfoSecion from "@/components/dashboard/businessInfoSection";
import SuggestionSection from "@/components/dashboard/suggestionsSection";
import { Card } from "flowbite-react";
import GeneralTable from "@/components/tables/generalTable";
import { useTableInfo } from "./actions";
import OngoingRegSection from "@/components/dashboard/ongoingRegSection";
import useRequestApi from "@/hooks/useRequestApi";
import { useSession } from "next-auth/react";

// interface BadgeProps {
//   size?: "sm" | "lg";
//   status: "Pending" | "Ongoing" | "Completed" | "Submitted";
// }
// const ApplicationBadge: React.FC<BadgeProps> = ({ size = "sm", status }) => {
//   let badgeColor = "";

//   switch (status) {
//     case "Pending":
//       badgeColor = "red";
//       break;
//     case "Ongoing":
//       badgeColor = "yellow";
//       break;
//     case "Completed":
//       badgeColor = "pink";
//       break;
//     case "Submitted":
//       badgeColor = "green";
//       break;
//     default:
//       badgeColor = "gray";
//   }

//   return (
//     <span
//       className={`inline-block px-2 py-1 text-xs font-semibold text-${badgeColor}-800 bg-${badgeColor}-400 rounded first-letter:uppercase ${
//         size === "sm" ? "text-sm" : "text-xs"
//       }`}
//     >
//       {status || ""}
//     </span>
//   );
// };

export default function Dashboard() {
  const { tableHeaders, tableBody } = useTableInfo();
  const session = useSession();
  const userId = session.data?.user?.id;

  const { useGetUserRequestsQuery } = useRequestApi();
  const { data } = useGetUserRequestsQuery(userId);
  console.log(data);

  return (
    <div className="p-5 space-y-14 md:p-8">
      <WelcomeSection />
      <BusinessInfoSecion />
      <HandpickedSection />
      <SuggestionSection />
      <BusinessMembersSection />
      <OngoingRegSection />
      <Card>
        <GeneralTable
          tableHeaders={tableHeaders}
          tableBody={tableBody}
          serviceTableNav={serviceTableNav}
          title="All Services"
        />
      </Card>
    </div>
  );
}

export const serviceTableNav = [
  {
    name: "service",
    value: "all",
  },
  {
    name: "service",
    value: "draft",
  },

  {
    name: "service",
    value: "submitted",
  },
  {
    name: "service",
    value: "completed",
  },
];
