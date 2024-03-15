import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { Oval } from "react-loading-icons";
import { Button } from "flowbite-react";
import { customTheme } from "@/app/baseCustomTheme";

const WelcomeSection = () => {
  return (
    <div className="flex flex-col justify-between gap-3 md:gap-8 md:flex-row">
      <div className="md:w-4/6">
        <p className="sb-text-24 font-semibold">Welcome to Sidebrief, Joshua</p>
        <p className="text-sm text-foreground-3 font-normal lg:sb-text-18">
          We are glad to have you join the 22,000,000 people all over the world who manage their
          businesses using the simplest and easiest business solution.
        </p>
      </div>

      <div>
        <Button
          color="secondary"
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          theme={customTheme.theme?.button}
        >
          <span>Register new business</span> <ArrowRightCircle className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeSection;
