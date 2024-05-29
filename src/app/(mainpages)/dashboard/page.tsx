"use client";

import WelcomeSection from "@/components/dashboard/welcomeSection";
import HandpickedSection from "@/components/dashboard/handpickedSection";
import BusinessMembersSection from "@/components/dashboard/businessMembersSection";
import BusinessInfoSecion from "@/components/dashboard/businessInfoSection";
import SuggestionSection from "@/components/dashboard/suggestionsSection";
import { useTableInfo } from "./actions";
import OngoingRegSection from "@/components/dashboard/ongoingRegSection";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useGetUserBusinessRequests, useGetBusinessRequest } from "@/services/business";
import TableSection from "./tableSection";
import { useSearchParams } from "next/navigation";
import { compareAsc } from "date-fns";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

export default function Dashboard() {
  const { tableHeaders, tableBody } = useTableInfo();
  const { setQuery } = useGlobalFunctions();
  const session = useSession();
  const userId = session.data?.user?.id;
  // console.log(session);

  const searchParams = useSearchParams();
  // const [selectedBusiness, setSelectedBusiness] = useState("");

  // const { useGetUserRequestsQuery } = useRequestApi();
  // const { data } = useGetUserRequestsQuery(userId);
  // const userRequests = data?.data?.data;

  // check if 1 or more business request has being created
  const getBusinessRequests = useGetUserBusinessRequests({ userId });
  const businessRequests = getBusinessRequests.data?.data.data;
  const sortedBusinessReqs = businessRequests?.sort((a, b) =>
    compareAsc(b?.createdAt, a?.createdAt)
  );

  const selectedBusinessId = searchParams.get("businessId") || sortedBusinessReqs?.[0]?.id || "";

  const OneOrMoreBusiness = (businessRequests || []).length >= 1;

  const getBusinessRequest = useGetBusinessRequest({ id: selectedBusinessId });
  const businessRequest = getBusinessRequest.data?.data.data;
  const productRequests = businessRequest?.productRequest;
  const pendingRequests =
    productRequests
      ?.filter((p) => p.status === "PENDING")
      ?.sort((a, b) => compareAsc(b?.createdAt, a?.createdAt)) || [];
  const moreThanOneRequest = (productRequests || []).length > 1;

  const showTableSection = productRequests && productRequests.length > 1;

  const loading =
    session.status === "loading" || getBusinessRequests.isLoading || getBusinessRequest.isLoading;

  return (
    <div className="p-5 space-y-14 md:p-8">
      {!OneOrMoreBusiness && !loading && <WelcomeSection />}

      {pendingRequests?.length > 0 && (
        <OngoingRegSection
          mostRecentPending={pendingRequests[0]}
          isLoading={getBusinessRequest.isLoading}
        />
      )}

      {!OneOrMoreBusiness && !loading && <HandpickedSection />}

      {(OneOrMoreBusiness || loading) && (
        <BusinessInfoSecion
          selectedBusinessId={selectedBusinessId}
          setSelectedBusiness={(id: string) => setQuery("businessId", id)}
          sortedBusinessReqs={sortedBusinessReqs}
          isLoading={getBusinessRequests.isLoading}
        />
      )}

      {(OneOrMoreBusiness || loading) && (
        <SuggestionSection
          businessRequestId={productRequests?.[0].id}
          isLoading={getBusinessRequest.isLoading}
        />
      )}

      {(OneOrMoreBusiness || loading) && (
        <BusinessMembersSection
          businessRequest={businessRequest}
          isLoading={getBusinessRequest.isLoading}
        />
      )}

      {showTableSection && <TableSection selectedBusiness={selectedBusinessId} />}
    </div>
  );
}
