import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { formsStep, infoStep, paymentStep, plansStep, reviewStep } from "./constants";

export const useLaunchSteps = () => {
  const { serviceId }: { serviceId: string } = useParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Information from url
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSForms = searchParams.get("hasSForms");
  const hasPForms = searchParams.get("hasPForms");
  const progress = parseInt(searchParams.get("progress") || "0");
  const activePage = pathname.split("/")[3];

  const handleClick = (i: number, route: string) => {
    if (progress >= i)
      setQueriesWithPath({
        path: `/requests/${serviceId}${route}`,
        queries: [
          { name: "activeTab", value: "0" },
          { name: "activeSubTab", value: "0" },
        ],
      });
  };

  const SForms = hasSForms === "true" || hasSForms === null ? true : false;
  const PForms = hasPForms === "true" || hasPForms === null ? true : false;

  // Dynamic request steps
  let requestSteps = [plansStep, paymentStep, reviewStep];
  if (SForms && PForms) requestSteps = [plansStep, infoStep, paymentStep, formsStep, reviewStep];
  else if (SForms && !PForms) requestSteps = [plansStep, infoStep, paymentStep, reviewStep];
  else if (!SForms && PForms) requestSteps = [plansStep, paymentStep, formsStep, reviewStep];

  return {
    progress,
    handleClick,
    requestSteps,
    activePage,
  };
};
