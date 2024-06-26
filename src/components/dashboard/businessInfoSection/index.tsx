import { Badge, Button } from "@/components/flowbite";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { ArrowRightCircle, ChevronDown, Info } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSession } from "next-auth/react";
import { useGetUserBusinessRequests } from "@/services/business";
import { useQueries } from "@tanstack/react-query";
import { getRequestQA } from "@/services/productQA/operations";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";
import { Oval } from "react-loading-icons";
import { useGetServices } from "@/services/service";
import { getProductRequest } from "@/services/business/operations";
import { TBusinessDataFull } from "@/services/business/types";
import { getStatusBadgeColor } from "@/hooks/globalFunctions";

const BusinessInfoSecion = ({
  selectedBusinessId,
  setSelectedBusiness,
  sortedBusinessReqs,
  isLoading,
}: {
  selectedBusinessId: string;
  setSelectedBusiness: (id: string) => void;
  sortedBusinessReqs?: TBusinessDataFull[];
  isLoading: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const businessInit = useRef(false);

  const getServices = useGetServices();
  const services = getServices.data?.data.data;

  const priority1 = services?.find((el) => el.priority === 1);
  const priority2 = services?.find((el) => el.priority === 2);

  const getRequestQAQueries = useQueries({
    queries:
      sortedBusinessReqs?.map((request) => {
        return {
          queryKey: ["get product QA", request.productRequest[0]?.id],
          queryFn: () => getRequestQA({ requestId: request.productRequest[0].id }),
        };
      }) || [],
  });

  const getRequestQueries = useQueries({
    queries:
      sortedBusinessReqs?.map((request) => {
        return {
          queryKey: ["get product by id", request.productRequest[0].id],
          queryFn: () => getProductRequest({ productRequestId: request.productRequest[0].id }),
        };
      }) || [],
  });

  const requestQAQueries = getRequestQAQueries.map((QA) => QA.data?.data.data);

  const loadingProductQA = getRequestQAQueries.some((QA) => QA.isLoading);

  const requestQueries = getRequestQueries.map((request) => request.data?.data.data);

  const loadingRequest = getRequestQueries.some((request) => request.isLoading);

  // console.log(requestQueries);

  const businesses = sortedBusinessReqs?.map((business, index) => {
    return {
      id: business.id,
      name:
        business.companyName ||
        requestQAQueries[index]
          ?.find((qa) => qa.subForm.some((subform) => subform.type === "business name"))
          ?.subForm.find((subform) => subform.type === "business name")?.answer[0] ||
        `My Business Name`,
      address:
        business.headOfficeAddress ||
        requestQAQueries[index]
          ?.find((qa) => qa.subForm.some((subform) => subform.type === "address"))
          ?.subForm.find((subform) => subform.type === "address")?.answer[0] ||
        "No address found",
      status: requestQueries[index]?.status,
    };
  });

  const handleSelect = (selected?: string) => {
    selected && setSelectedBusiness(selected);
  };

  useEffect(() => {
    if (businesses && businesses.length > 0 && !businessInit.current) {
      setSelectedBusiness(selectedBusinessId || businesses[0].id);
      businessInit.current = true;
    }
  }, [businesses, setSelectedBusiness]);

  // console.log(businesses);

  const loading = loadingProductQA || session.status === "loading" || isLoading || loadingRequest;

  const selectBusiness = businesses?.find((el) => el.id === selectedBusinessId);

  const selectedBusinessName = selectBusiness?.name;

  const selectAddress = selectBusiness?.address;

  const selectStatus = selectBusiness?.status || "";

  const selectdate = sortedBusinessReqs?.find((each) => each.id === selectedBusinessId)?.createdAt;

  return (
    <div className="flex flex-col gap-12 md:justify-between md:flex-row md:gap-3">
      <div className="text-foreground-3">
        <div className="flex items-center gap-4 mb-2.5">
          <PopOverWrapper
            open={open}
            setOpen={setOpen}
            // onClose={() => console.log("Closed")}
            content={
              !loading ? (
                <BusinessList
                  businesses={businesses || []}
                  handleSelect={handleSelect}
                  setOpen={setOpen}
                />
              ) : (
                <Skeleton className="w-full h-full" />
              )
            }
          >
            <Button color="ghost" size="fit" className="text-start [&>span]:justify-start ">
              <h2 className="sb-text-24 font-bold whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] sm:max-w-[400px] lg:max-w-[500px] 2xl:max-w-[800px]">
                {selectedBusinessName || <Skeleton className="w-20 h-full" />}
              </h2>
              <ChevronDown />
            </Button>
          </PopOverWrapper>
          <Badge
            icon={() => <Info size={10} className="shrink-0" />}
            color="yellow"
            className="hidden px-2.5 py-0.5 rounded-md text-xs font-normal min-[350px]:flex"
          >
            My business
          </Badge>
        </div>
        {selectBusiness ? (
          <p className="sb-text-18 mb-3">{selectAddress}</p>
        ) : (
          <Skeleton className="w-full h-6" />
        )}
        <div className="flex items-center gap-2">
          <Badge color={getStatusBadgeColor(selectStatus)} className="sb-text-14">
            {selectStatus}
          </Badge>
          <span className="sb-text-14">
            {selectBusiness ? (
              `${format(selectdate || "", "do MMMM, yyyy")}`
            ) : (
              <Skeleton className="w-20 h-full" />
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row md:items-center md:gap-7">
        {selectBusiness?.status === "COMPLETED" ? (
          !getServices.isLoading ? (
            <>
              {priority2 && (
                <Link href={`/requests/${priority2?.id}`}>
                  <Button
                    outline
                    className="border-foreground"
                    processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
                  >
                    <span>{priority2?.label}</span>
                    <ArrowRightCircle fill="hsl(var(--foreground))" stroke="white" />
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <Skeleton className="w-48 h-12" />
          )
        ) : (
          ""
        )}
        <div>
          {!getServices.isLoading ? (
            <>
              {priority1 && (
                <Link href={`/requests/${priority1?.id}`}>
                  <Button
                    color="secondary"
                    processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
                  >
                    <span>{priority1?.label}</span>
                    <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <Skeleton className="w-48 h-12" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoSecion;

export const BusinessList = ({
  businesses,
  handleSelect,
  setOpen,
}: {
  businesses: { name: string; id: string }[];
  handleSelect: (selected?: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Command>
      {businesses.length > 10 && <CommandInput placeholder="Filter status..." />}
      <CommandList>
        {businesses?.length === 0 && (
          <div className="text-foreground-5 text-sm p-2 pb-0">No business found</div>
        )}
        <CommandGroup>
          {businesses
            // .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={(value) => {
                  handleSelect([...businesses].find((each) => each.id === value)?.id);
                  setOpen(false);
                }}
                // className="text-foreground-7 capitalize"
              >
                {item.name}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

const businesses = ["Lola", "Ayomide Construction", "Folagbade & Sons construction company"];
