import { Badge, Button } from "flowbite-react";
import { ArrowRightCircle, Info, InfoIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSteps } from "./constants";
import { useGetUserBusinessRequests } from "@/services/business";
import { useSession } from "next-auth/react";
import { OngoingRegSkeleton } from "./skeleton";
import Link from "next/link";
import { useGetProductRequest } from "@/services/business";
import { useGetService } from "@/services/service";
import { sluggify } from "@/lib/utils";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

const OngoingRegSection = () => {
  const session = useSession();

  const userId = session.data?.user?.id ?? "";

  const activeStep = "Kyc".toLowerCase();

  const afterProfile = activeStep === "payment" || activeStep === "kyc" || activeStep == "review";
  const afterPayment = activeStep === "kyc" || activeStep == "review";
  const afterInfo = activeStep == "review";

  const { setQueriesWithPath } = useGlobalFunctions();

  const userRequests = useGetUserBusinessRequests({ userId: userId });

  const businessRequests = userRequests.data?.data.data;

  const latest = businessRequests ? businessRequests[businessRequests?.length - 1] : undefined;

  const productRequestId = latest ? latest.productRequest[0].id : "";

  const productRequest = useGetProductRequest(productRequestId);

  const serviceId = productRequest?.data?.data.data.product.serviceId;

  const Serrvice = useGetService(serviceId || "");

  const { steps, loading: stepLoading } = useSteps({
    productRequestId: productRequestId,
    serviceId: serviceId || "",
    productId: productRequest.data?.data.data.productId || "",
  });

  const loading =
    session.status === "loading" ||
    userRequests.isLoading ||
    productRequest.isLoading ||
    Serrvice.isLoading ||
    stepLoading;

  if (loading) {
    return <OngoingRegSkeleton />;
  }

  let urlSuffix = "info";

  // Find the first step that is not done
  for (let i = 0; i < steps.length; i++) {
    if (!steps[i].done) {
      switch (steps[i].step) {
        case "Step 2":
          urlSuffix = "info";
          break;
        case "Step 3":
          // urlSuffix = "payment";
          urlSuffix = "kyc";
          break;
        case "Step 4":
          urlSuffix = "kyc";
          break;
        default:
          urlSuffix = "info";
      }
      break;
    }
  }

  return (
    <div className="flex flex-col gap-9 bg-accent rounded-lg">
      <div className="flex justify-between flex-col gap-6 px-8 pb-5 py-1.5 m-0.5 bg-white rounded-t rounded-lg md:flex-row">
        <div className="md:max-w-[50%]">
          <div className="flex items-center gap-4">
            <h2 className="sb-text-24 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] 2xl:max-w-[800px]">
              {latest?.companyName ? latest.companyName : "No Registered Name Yet"}
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
          {/* TODO: get the particular position to go to */}
          {/* <Link
            href={`http://localhost:3000/requests/${Serrvice.data?.data.data.id}/${urlSuffix}/${latest?.id}`}
          > */}
          <Button
            color="secondary"
            className="md:px-6 md:py-1.5"
            onClick={() => {
              setQueriesWithPath({
                path: `/requests/${Serrvice.data?.data.data.id}/${urlSuffix}`,
              });
            }}
          >
            Resume
            <ArrowRightCircle fill="white" stroke="hsl(var(--secondary))" />
          </Button>
          {/* </Link> */}
        </div>
      </div>

      <div className="flex overflow-auto gap-2.5 mx-8 mb-8">
        {steps.map((el) => {
          // const state = el.state.toLowerCase();
          const done = el.done;

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
