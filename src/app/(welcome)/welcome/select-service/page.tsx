"use client";

import ServiceCard from "@/components/cards/ServiceCard";
import useServiceApi from "@/hooks/useServiceApi";
import { Button } from "flowbite-react";
import { ArrowRightCircle, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { IServiceFull } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import ServiceCardSK from "@/components/cards/ServiceCard/ServiceCardSK";
import { AuthStepper } from "../../auth/authStepper";

const SelectService = () => {
  const { setQuery } = useGlobalFunctions();

  const { getAllServicesQuery } = useServiceApi();
  const { data, isLoading } = getAllServicesQuery;
  const servicesData = data?.data.data;

  const session = useSession();
  const userName = session?.data?.user?.fullName;

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("serviceId");

  const handleContinue = () => {
    router.push("/welcome/select-country?" + searchParams.toString());
  };

  return (
    <div>
      <h2 className="hidden sb-text-32 font-semibold mb-2 sm:flex">Kindly select a service</h2>

      <h3 className="mb-7 font-normal text-foreground-3 sm:mt-10">WELCOME TO SIDEBRIEF</h3>
      <div className="sb-text-16 font-semibold mb-6">
        Hello <span className="font-normal first-letter:capitalize">{userName} 👋</span>, You&#39;re
        welcome to Sidebrief, where we handle all your businesses&#39; legal works. Tell us why you
        are here.
      </div>

      <div className="grid grid-cols-2 gap-2 mb-12 p-2 rounded sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 bg-accent">
        {isLoading && [1, 2, 3, 4].map((el) => <ServiceCardSK key={el} />)}
        {servicesData?.map((service: IServiceFull) => (
          <ServiceCard
            key={service.name}
            name={service.name}
            description={service.description}
            onClick={() => setQuery("serviceId", service.id)}
            active={selectedService === service.id}
          />
        ))}
      </div>

      <AuthStepper progress={2} />

      <div className="flex justify-between mt-7 md:mt-9">
        <Button color="plain" size="fit" className="text-destructive-foreground">
          Skip to Dashboard <ChevronRight />
        </Button>
        <Button color="secondary" onClick={handleContinue} disabled={!selectedService}>
          Continue <ArrowRightCircle className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default SelectService;
