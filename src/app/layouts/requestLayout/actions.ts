import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetProductForms, useGetServiceForms } from "@/services/service";
import { useParams, useSearchParams } from "next/navigation";
import { formsStep, infoStep, paymentStep, plansStep, reviewStep } from "./constants";

export const useLaunchSteps = () => {
  const { serviceId }: { serviceId: string } = useParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  const searchParams = useSearchParams();
  const progress = parseInt(searchParams.get("progress") || "0");

  const productFormsRes = useGetProductForms(serviceId);
  const noPForms = productFormsRes.data?.data?.data?.length === 0;

  const serviceFormsRes = useGetServiceForms(serviceId);
  const noSForms = serviceFormsRes.data?.data?.data?.length === 0;

  const handleClick = (i: number, route: string) => {
    if (progress >= i) setQueriesWithPath({ path: `/requests/${serviceId}${route}` });
  };

  let launchSteps = [plansStep, paymentStep, reviewStep];
  if (!noPForms && !noSForms)
    launchSteps = [plansStep, infoStep, paymentStep, formsStep, reviewStep];
  else if (!noSForms && noPForms) launchSteps = [plansStep, infoStep, paymentStep, reviewStep];
  else if (!noPForms && noSForms) launchSteps = [plansStep, paymentStep, formsStep, reviewStep];

  return {
    progress,
    handleClick,
    launchSteps,
  };
};
