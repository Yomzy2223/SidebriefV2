import { Button } from "flowbite-react";
import React from "react";

const WelcomeSection = () => {
  return (
    <div className="flex justify-between">
      <div className="md:w-4/6">
        <p className="sb-text-24 font-semibold">Welcome to Sidebrief, Joshua</p>
        <p className="text-sm text-foreground-3 font-normal md:sb-text-18">
          We are glad to have you join the 22,000,000 people all over the world who manage their
          businesses using the simplest and easiest business solution.
        </p>
      </div>

      <div>
        <Button color="secondary">Register new business</Button>
      </div>
    </div>
  );
};

export default WelcomeSection;
