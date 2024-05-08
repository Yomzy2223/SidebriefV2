import useServiceApi from "@/hooks/useServiceApi";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useRequestApi from "@/hooks/useRequestApi";
import { IRowInfo, ITableBody } from "@/components/tables/generalTable/constants";
import { format } from "date-fns";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { IRequest, IServiceFull } from "@/hooks/api/types";

// Table information
export const useTableActions = ({
  setOpenAssign,
  setOpenUnAssign,
  setOpenInfo,
  setSelectedRequests,
  setPartnerId,
  itemsPerPage,
  serviceId,
}: {
  setOpenAssign: Dispatch<SetStateAction<boolean>>;
  setOpenUnAssign: Dispatch<SetStateAction<boolean>>;
  setOpenInfo: Dispatch<SetStateAction<boolean>>;
  setSelectedRequests: Dispatch<SetStateAction<string[]>>;
  setPartnerId: Dispatch<SetStateAction<string>>;
  itemsPerPage: number;
  serviceId?: string;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { getReqStatusColor } = useGlobalFunctions();

  const router = useRouter();
  const searchParams = useSearchParams();

  const { getAllServicesQuery } = useServiceApi();
  const services = getAllServicesQuery;
  const servicesData = services.data?.data?.data || [];

  const selectedServiceId = serviceId || searchParams.get("serviceId") || "";
  const tablePage = parseInt(searchParams.get("page") || "1");

  const {
    useGetServiceRequestQuery,
    assignRequestMutation,
    unAssignRequestMutation,
    useGetAllRequestsQuery,
    searchRequestMutation,
  } = useRequestApi();

  const allRequestsResponse = useGetAllRequestsQuery({
    page: tablePage,
    pageSize: itemsPerPage,
  });
  const serviceRequestsResponse = useGetServiceRequestQuery({
    serviceId: selectedServiceId,
    page: tablePage,
    pageSize: itemsPerPage,
  });

  const allRequests = allRequestsResponse.data?.data;
  const serviceRequests = serviceRequestsResponse.data?.data;
  const searchRequests = searchRequestMutation.data?.data;

  const requests: IRequest[] = searchValue
    ? searchRequests?.data
    : selectedServiceId
    ? serviceRequests?.data
    : allRequests?.data;

  const totalRequests = searchValue
    ? searchRequests?.data?.length
    : selectedServiceId
    ? serviceRequests?.total
    : allRequests?.total;

  const requestsLoading =
    allRequestsResponse.isLoading ||
    serviceRequestsResponse.isLoading ||
    searchRequestMutation.isPending;

  const serviceTableNav = servicesData?.map((service: IServiceFull) => ({
    name: "serviceId",
    value: service.id,
    text: service.name,
  }));

  const handleSearchChange = (value: string) => {
    searchRequestMutation.mutate({
      formInfo: { queryString: value, serviceId: selectedServiceId },
    });
    setSearchValue(value);
  };

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
  };

  const handleClick = (e: MouseEvent<HTMLTableRowElement>, rowId: string, rowInfo: IRowInfo[]) => {
    router.push(`/services/request/${rowId}`);
  };

  const handleAssignClick = (e: MouseEvent<HTMLTableCellElement>, rowId: string, text: string) => {
    e.stopPropagation();
    setOpenAssign(true);
    setSelectedRequests([rowId]);
  };

  const handleUnAssignClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpenUnAssign(true);
    setSelectedRequests([rowId]);
    setPartnerId(requests.find((el: IRequest) => el.id === rowId)?.partnerInCharge || "");
  };

  const handleViewClick = (e: MouseEvent<HTMLTableCellElement>, rowId: string, text: string) => {
    e.stopPropagation();
    setOpenInfo(true);
    setSelectedRequests([rowId]);
  };

  // Services table header
  const tableHeaders = [
    "S/N",
    "BUSINESS NAME",
    "PRODUCT NAME",
    "STATUS",
    "CURRENT STATE",
    "PAYMENT STATUS",
    "DATE",
    "ACTION",
  ];

  // Services table body
  const tableBody =
    requests?.map((request: IRequest, i: number): ITableBody => {
      const assigned = request.status === "ASSIGNED";
      const completed = request.status === "COMPLETED";
      const assignable = request.status === "SUBMITTED" || request.status === "REJECTED";

      let actionText = "";
      if (assignable) actionText = "Assign";
      if (request.status === "PENDING") actionText = "Not submitted yet";
      if (assigned) actionText = "Unassign";
      if (completed) actionText = "Partner info";

      const currentNumber = (tablePage - 1) * itemsPerPage + i + 1;

      return {
        rowId: request.id,
        handleClick,
        rowInfo: [
          {
            text: currentNumber.toString().padStart(2, "0"),
          },
          { text: request?.businessName || "No registered name" },
          { text: request?.serviceName },
          {
            text: request.status,
            cellProps: {
              className: cn(cellClassName, getReqStatusColor(request.status)),
            },
          },
          { text: request.currentState },
          { text: request.paid ? "Paid" : "Not Paid Yet" },
          { text: format(request.createdAt, "MMMM dd, yyyy") },
          {
            text: actionText,
            handleClick: assignable
              ? handleAssignClick
              : assigned
              ? handleUnAssignClick
              : completed
              ? handleViewClick
              : (e) => {
                  e.stopPropagation();
                },
            cellProps: {
              className: cn(" text-foreground-5 italic", {
                "text-primary underline not-italic": assignable || assigned || completed,
              }),
            },
          },
        ],
      };
    }) || [];

  return {
    serviceTableNav,
    tableHeaders,
    tableBody,
    assignRequestMutation,
    unAssignRequestMutation,
    totalRequests,
    handleSearchChange,
    handleSearchSubmit,
    requestsLoading,
  };
};

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md  text-xs";
