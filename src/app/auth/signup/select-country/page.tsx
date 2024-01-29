"use client";

import { CountryCard } from "@/components/cards/countrycard";
import { AuthStepper } from "@/components/stepper/auth";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SelectCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth/signup/select-country");
  };

  return (
    <div>
      <h2 className="hidden sb-text-32 font-semibold mb-2 sm:flex">
        Create an account for free
      </h2>
      <h3 className="mb-7 text-foreground-3 sm:mt-10">WELCOME TO SIDEBRIEF</h3>
      <div className="sb-text-16 font-semibold mb-6">
        Lastly, the business country of operation is.
      </div>

      {/* {countries.map((country) => (
        <CountryCard
          key={country}
          name={country}
          active={selectedCountry === country}
          onClick={() => setSelectedCountry(country)}
        />
      ))} */}

      <AuthStepper progress={3} />

      <div className="flex justify-between">
        <Button
          color="plain"
          size="fit"
          className="text-destructive-foreground"
        >
          Go back
        </Button>
        <Button color="secondary" onClick={handleContinue}>
          Done <ArrowRightCircle className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default SelectCountry;

const countries = [
  "Nigeria",
  "Ghana",
  "Senegal",
  "Uganda",
  "Kenya",
  "Delaware",
];
