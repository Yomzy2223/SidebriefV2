import { Badge, Button } from "flowbite-react";
import { ArrowRight } from "@/assets/icons";
import { useParams, useSearchParams } from "next/navigation";
import { useGetBusinessRequest } from "@/services/business";
import { useGetRequestQA } from "@/services/productQA";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useGetServices } from "@/services/service";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const { businessId } = useParams();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const requestId = searchParams.get("requestId") || "";

  const getBusinessRequest = useGetBusinessRequest({ id: businessId as string });
  const getRequestQA = useGetRequestQA(requestId);
  const business = getBusinessRequest.data?.data.data;
  const productQA = getRequestQA.data?.data.data;

  const getServices = useGetServices();
  const services = getServices.data?.data.data;

  const priority1 = services?.find((el) => el.priority === 1);

  const loading = getBusinessRequest.isLoading || getRequestQA.isLoading;

  const name =
    business?.companyName ||
    productQA
      ?.find((qa) => qa.subForm.some((subform) => subform.type === "business name"))
      ?.subForm.find((subform) => subform.type === "business name")?.answer[0] ||
    `No added name`;

  return (
    <div className="flex justify-between items-center px-4 pt-10 pb-6">
      <div className="flex flex-col gap-1">
        <p className="text-[#727474] text-sm font-medium uppercase">Business Registration</p>
        <div className="flex gap-8 items-center">
          {loading ? (
            <Skeleton className="w-[200px] h-8" />
          ) : (
            <h1 className="text-2xl font-semibold">{name}</h1>
          )}
          <Badge color={"green"}>
            <p className="text-green-400">completed</p>
          </Badge>
        </div>
      </div>
      <div>
        {!getServices.isLoading ? (
          <>
            {priority1 && (
              <Link href={`/requests/${priority1?.id}`}>
                <Button color="secondary">
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
  );
};
