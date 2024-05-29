"use client";

import { CountryCard } from "@/components/cards/CountryCard";
import { AuthStepper } from "@/app/(welcome)/auth/authStepper";
import { ICountry } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useCountryApi } from "@/hooks/useCountryApi";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SelectCountry = () => {
  const { setQuery } = useGlobalFunctions();

  const router = useRouter();

  const { getAllCountriesQuery } = useCountryApi();
  const { data, isLoading } = getAllCountriesQuery;
  const countriesData = data?.data?.data;

  const searchParams = useSearchParams();
  const selectedCountry = searchParams.get("country");

  const handleContinue = () => {
    router.push("/welcome/select-product?" + searchParams.toString());
  };

  const handleBack = () => {
    router.push("/welcome/select-service?" + searchParams.toString());
  };

  return (
    <div>
      <h2 className="hidden sb-text-32 font-semibold mb-2 sm:flex">
        Kindly select operation country
      </h2>

      <h3 className="mb-7 font-normal text-foreground-3 sm:mt-10">WELCOME TO SIDEBRIEF</h3>
      <div className="sb-text-16 font-semibold mb-14 sm:mb-8">
        Select the business country of operation
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-4 mb-16 sm:gap-2">
          {isLoading &&
            [1, 2, 3, 4].map((el) => (
              <Skeleton key={el} className="h-10 w-full max-w-[500px] rounded-xl overflow-hidden" />
            ))}
          {countriesData?.map((country: ICountry) => (
            <CountryCard
              key={country.name}
              name={country.name}
              active={selectedCountry === country.name}
              onSelect={() => setQuery("country", country.name.toLowerCase())}
            />
          ))}
        </div>

        <AuthStepper progress={3} />

        <div className="flex justify-between mt-7 md:mt-9">
          <Button
            color="plain"
            size="fit"
            className="text-destructive-foreground"
            onClick={handleBack}
          >
            Go back
          </Button>
          <Button color="secondary" onClick={handleContinue} disabled={!selectedCountry}>
            Continue <ArrowRightCircle className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectCountry;

const countries = ["Nigeria", "Ghana", "Senegal", "Uganda", "Kenya", "Delaware"];
