import { InfoGif, PaymentCardGif, ProfileGif, ReviewGif } from "@/assets/gif";
import { Badge, Button } from "flowbite-react";
import { ArrowRightCircle, Info, InfoIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const OngoingRegSection = () => {
  const activeStep = "Payment";

  return (
    <div className="flex flex-col gap-9 bg-accent rounded-lg">
      <div className="flex justify-between flex-col gap-6 px-8 pb-5 py-1.5 m-0.5 bg-white rounded-t rounded-lg md:flex-row">
        <div className="md:max-w-[50%]">
          <div className="flex items-center gap-4">
            <h2 className="sb-text-24 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] 2xl:max-w-[800px]">
              Contifery agricultural limited
            </h2>
            <Badge color="pink" icon={() => <InfoIcon size={10} />}>
              Ongoing
            </Badge>
          </div>
          <p className="text-sm w-4/5">
            Now continue the process of registering your business without the need for any physical
            paperwork.
          </p>
        </div>
        <div className="flex items-center gap-10 md:gap-16">
          <Button size="fit" color="ghost" className="underline text-destructive-foreground">
            Delete
          </Button>
          <Button color="secondary" className="md:px-6 md:py-1.5">
            Resume
            <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
          </Button>
        </div>
      </div>

      <div className="flex overflow-auto gap-2.5 mx-8 mb-8">
        {steps.map((el) => {
          const done = el.state.toLowerCase() === activeStep.toLowerCase();
          return (
            <div
              key={el.step}
              className="flex flex-col justify-between gap-1 border border-border px-6 py-5 text-sm text-foreground-3 font-normal rounded bg-white min-w-[250px]"
            >
              <Image src={el.icon} alt="" className="w-[60px] h-auto mb-4" />
              <div>
                <p className="uppercase mb-1">{el.step}</p>
                <p>{el.description}</p>
                <Badge
                  icon={() => <InfoIcon size={10} />}
                  color={done ? "success" : "failure"}
                  className="align-middle w-max mt-1"
                >
                  {done ? "Done" : "Not done yet"}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OngoingRegSection;

const steps = [
  {
    step: "Step 1",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "request-info",
    icon: ProfileGif,
  },
  {
    step: "Step 2",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "payment",
    icon: PaymentCardGif,
  },
  {
    step: "Step 3",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "kyc",
    icon: InfoGif,
  },
  {
    step: "Step 4",
    description:
      "Now continue the process of registering your business without the need for any physical paperwork.",
    state: "review",
    icon: ReviewGif,
  },
];
