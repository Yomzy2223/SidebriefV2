"use client";

import { Badge, Button } from "flowbite-react";
import { ArrowRight } from "@/assets/icons";
import { useParams, useSearchParams } from "next/navigation";
import { useGetBusinessRequest, useGetProductRequest } from "@/services/business";
import { useGetRequestQA } from "@/services/productQA";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useGetServices } from "@/services/service";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useGetProductById } from "@/services/product";

export const Header = () => {
  const { businessId } = useParams();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const requestId = searchParams.get("requestId") || "";

  const getBusinessRequest = useGetBusinessRequest({ id: businessId as string });
  const getRequestQA = useGetRequestQA(requestId);
  const getProduct = useGetProductById(productId);
  const getRequest = useGetProductRequest(requestId);
  const business = getBusinessRequest.data?.data.data;
  const productQA = getRequestQA.data?.data.data;
  const product = getProduct.data?.data.data;
  const request = getRequest.data?.data.data;

  const getServices = useGetServices();
  const services = getServices.data?.data.data;

  const currentService = services?.find((el) => el.id === product?.serviceId);

  const priority2 = services?.find((el) => el.priority === 2);

  const loading =
    getBusinessRequest.isLoading ||
    getRequestQA.isLoading ||
    getProduct.isLoading ||
    getRequest.isLoading;

  const name =
    business?.companyName ||
    productQA
      ?.find((qa) => qa.subForm.some((subform) => subform.type === "business name"))
      ?.subForm.find((subform) => subform.type === "business name")?.answer[0] ||
    `My Business Name`;

  return (
    <div className="flex justify-between items-center px-4 pt-10 pb-6">
      <div className="flex flex-col gap-1">
        {loading ? (
          <Skeleton className="w-[150px] h-5" />
        ) : (
          <p className="text-[#727474] text-sm font-medium uppercase">{currentService?.name}</p>
        )}
        <div className="flex gap-8 items-center">
          {loading ? (
            <Skeleton className="w-[200px] h-8" />
          ) : (
            <h1 className="text-2xl font-semibold">{name}</h1>
          )}
          {loading ? (
            <Skeleton className="w-20 h-4" />
          ) : (
            <Badge color={"green"}>
              <p className="text-green-400">{request?.status}</p>
            </Badge>
          )}
        </div>
      </div>
      <div>
        {!getServices.isLoading ? (
          <>
            {priority2 && (
              <Link href={`/requests/${priority2?.id}`}>
                <Button outline>
                  <span>{priority2?.label}</span>
                  <ArrowRightCircle />
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
