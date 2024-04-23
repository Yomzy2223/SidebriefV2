import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetProductForms, useGetServiceForms } from "@/services/service";
import { useParams, useSearchParams } from "next/navigation";
import { formsStep, infoStep, paymentStep, plansStep, reviewStep } from "./constants";

export const useLaunchSteps = () => {
  const { serviceId }: { serviceId: string } = useParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  const searchParams = useSearchParams();
  const progress = parseInt(searchParams.get("progress") || "0");
  const activePage = parseInt(searchParams.get("activePage") || progress.toString());

  const productFormsRes = useGetProductForms(serviceId);
  const hasPForms = productFormsRes.data?.data?.data?.length ?? 0 > 0;

  const serviceFormsRes = useGetServiceForms(serviceId);
  const hasSForms = serviceFormsRes.data?.data?.data?.length ?? 0 > 0;

  const handleClick = (i: number, route: string) => {
    if (progress >= i)
      setQueriesWithPath({
        path: `/requests/${serviceId}${route}`,
        queries: [{ name: "activePage", value: i.toString() }],
      });
  };

  // Dynamic request steps
  let requestSteps = [plansStep, paymentStep, reviewStep];
  if (hasSForms && hasPForms)
    requestSteps = [plansStep, infoStep, paymentStep, formsStep, reviewStep];
  else if (hasSForms && !hasPForms) requestSteps = [plansStep, infoStep, paymentStep, reviewStep];
  else if (!hasSForms && hasPForms) requestSteps = [plansStep, paymentStep, formsStep, reviewStep];

  return {
    progress,
    handleClick,
    requestSteps,
    activePage,
  };
};
