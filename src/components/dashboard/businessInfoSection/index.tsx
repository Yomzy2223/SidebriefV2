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

const BusinessInfoSecion = ({
  selectedBusiness,
  setSelectedBusiness,
}: {
  selectedBusiness: string;
  setSelectedBusiness: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const businessInit = useRef(false);

  const getServices = useGetServices();
  const services = getServices.data?.data.data;

  const priority1 = services?.find((el) => el.priority === 1);

  const userId = session.data?.user.id;

  const getUserBusinessRequests = useGetUserBusinessRequests({ userId });

  const userBusinessRequests = getUserBusinessRequests.data?.data.data;

  const sortedUserBusinessRequests = userBusinessRequests?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // console.log(sortedUserBusinessRequests);

  const getProductQAQueries = useQueries({
    queries:
      sortedUserBusinessRequests?.map((request) => {
        return {
          queryKey: ["get product QA", request.productRequest[0].id],
          queryFn: () => getRequestQA({ requestId: request.productRequest[0].id }),
        };
      }) || [],
  });

  const productQAQueries = getProductQAQueries.map((QA) => QA.data?.data.data);

  const loadingProductQA = getProductQAQueries.some((QA) => QA.isLoading);

  // console.log(productQAQueries);

  const businesses = sortedUserBusinessRequests?.map((business, index) => {
    return {
      id: business.id,
      name:
        business.companyName ||
        productQAQueries[index]
          ?.find((qa) => qa.subForm.some((subform) => subform.type === "business name"))
          ?.subForm.find((subform) => subform.type === "business name")?.answer[0] ||
        `No added name ${index}`,
    };
  });

  const handleSelect = (selected?: string) => {
    selected && setSelectedBusiness(selected);
  };

  useEffect(() => {
    if (businesses && businesses.length > 0 && !businessInit.current) {
      setSelectedBusiness(businesses[0].id);
      businessInit.current = true;
    }
  }, [businesses, setSelectedBusiness]);

  // console.log(businesses);

  const loading =
    loadingProductQA || session.status === "loading" || getUserBusinessRequests.isLoading;

  const selectBusiness = businesses?.find((el) => el.id === selectedBusiness)?.name;

  const selectAddress =
    sortedUserBusinessRequests?.find((each) => each.id === selectedBusiness)?.headOfficeAddress ||
    sortedUserBusinessRequests?.findIndex((each) => each.id === selectedBusiness)
      ? productQAQueries[
          sortedUserBusinessRequests?.findIndex((each) => each.id === selectedBusiness)
        ]
          ?.find((qa) => qa.subForm.some((subform) => subform.type === "address"))
          ?.subForm.find((subform) => subform.type === "address")?.answer[0] || "No address found"
      : "No address found";

  const selectdate = sortedUserBusinessRequests?.find(
    (each) => each.id === selectedBusiness
  )?.createdAt;

  return (
    <div className="flex flex-col gap-12 md:justify-between md:flex-row md:gap-3">
      <div className="text-foreground-3">
        <div className="flex items-center gap-4 mb-2.5">
          <PopOverWrapper
            open={open}
            setOpen={setOpen}
            onClose={() => console.log("Closed")}
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
                {selectBusiness || <Skeleton className="w-20 h-full" />}
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
        <p className="sb-text-18 mb-3">
          {selectBusiness ? selectAddress : <Skeleton className="w-full h-6" />}
        </p>
        <div className="flex items-center gap-2">
          <Badge color="green" className="sb-text-14">
            {/* TODO: do this status part */}
            Completed
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
        <Button outline className="border-foreground">
          <span>Manage this business</span>
          <ArrowRightCircle fill="hsl(var(--foreground))" stroke="white" />
        </Button>
        <div>
          {!getServices.isLoading ? (
            <Link href={`/requests/${priority1?.id}`}>
              <Button
                color="secondary"
                processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
              >
                <span>{priority1?.label}</span>
                <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
              </Button>
            </Link>
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
