"use client";

import { LaunchIcon } from "@/assets/svg";
import ServiceCard from "@/components/cards/serviceCard";
import { AuthStepper } from "@/components/stepper/auth";
import { Button, TextInput } from "flowbite-react";
import { ArrowRightCircle, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SelectService = () => {
  const [name, setName] = useState("");
  const [activeService, setActiveService] = useState("");

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        <span>Hello 👋</span>{" "}
        <input
          ref={inputRef}
          placeholder="Enter your name"
          className="border-none outline-none placeholder:font-normal placeholder:italic"
          onChange={(e) => setName(e.target.value)}
        />
        , You’re welcome to Sidebrief, where we handle everything about your
        business. Tell us why you are here.
      </div>

      <div className="grid grid-cols-2 gap-2 mb-12 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 lg:mb-6">
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            icon={service.icon}
            name={service.name}
            description={service.description}
            onClick={() => setActiveService(service.name)}
            active={activeService === service.name}
          />
        ))}
      </div>

      <AuthStepper progress={2} />

      <div className="flex justify-between">
        <Button
          color="plain"
          size="fit"
          className="text-destructive-foreground"
        >
          Skip to Dashboard <ChevronRight />
        </Button>
        <Button color="magenta" onClick={handleContinue}>
          Continue <ArrowRightCircle className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default SelectService;

const services = [
  {
    icon: LaunchIcon,
    name: "Register a Business",
    description:
      "Register your business without the need for any physical paperwork.",
  },
  {
    icon: LaunchIcon,
    name: "Onboard",
    description:
      "Register your business without the need for any physical paperwork.",
  },
  {
    icon: LaunchIcon,
    name: "Manage a Business",
    description:
      "Register your business without the need for any physical paperwork.",
  },
  {
    icon: LaunchIcon,
    name: "Tax",
    description:
      "Register your business without the need for any physical paperwork.",
  },
  {
    icon: LaunchIcon,
    name: "Compliance",
    description:
      "Register your business without the need for any physical paperwork.",
  },
  {
    icon: LaunchIcon,
    name: "Intellectual",
    description:
      "Register your business without the need for any physical paperwork.",
  },
];
