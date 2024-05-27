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
import { serviceTableNav } from "./constants";
import { useState } from "react";
import { useGetUserBusinessRequests, useGetBusinessRequest } from "@/services/business";
import TableSection from "./tableSection";

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
  // console.log(session);

  const [selectedBusiness, setSelectedBusiness] = useState("");

  // const { useGetUserRequestsQuery } = useRequestApi();
  // const { data } = useGetUserRequestsQuery(userId);
  // const userRequests = data?.data?.data;

  // check if 1 or more business request has being created
  const getBusinessRequests = useGetUserBusinessRequests({ userId: userId });

  const businessRequests = getBusinessRequests.data?.data.data;

  const moreThanOneRequest = (businessRequests || []).length > 1;

  const OneOrMoreRequests = (businessRequests || []).length >= 1;

  const getBusinessRequest = useGetBusinessRequest({ id: selectedBusiness });

  const businessRequest = getBusinessRequest.data?.data.data;

  const productRequests = businessRequest?.productRequest;

  const showTableSection = productRequests && productRequests.length > 1;

  const loading =
    session.status === "loading" || getBusinessRequests.isLoading || getBusinessRequest.isLoading;

  return (
    <div className="p-5 space-y-14 md:p-8">
      {!OneOrMoreRequests && !loading && <WelcomeSection />}
      {(OneOrMoreRequests || loading) && <OngoingRegSection />}

      {!OneOrMoreRequests && !loading && <HandpickedSection />}

      {(moreThanOneRequest || loading) && (
        <BusinessInfoSecion
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={(id: string) => setSelectedBusiness(id)}
        />
      )}

      {(moreThanOneRequest || loading) && <SuggestionSection selectedBusiness={selectedBusiness} />}

      {(moreThanOneRequest || loading) && (
        <BusinessMembersSection selectedBusiness={selectedBusiness} />
      )}

      {showTableSection && <TableSection selectedBusiness={selectedBusiness} />}
    </div>
  );
}
