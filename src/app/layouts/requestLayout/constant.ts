import { Thumbs, Profilecard, Clipboard, FileCheck } from "@/assets/icons";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useParams, useSearchParams } from "next/navigation";

export const useLaunchSteps = () => {
  const { serviceId }: { serviceId: string } = useParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  //   let productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const progress = parseInt(searchParams.get("progress") || "0");

  const handleClick = (i: number, route: string) => {
    if (progress >= i) setQueriesWithPath({ path: `/requests/${serviceId}${route}` });
  };

  return {
    productId,
    progress,
    handleClick,
    launchSteps: [
      {
        name: "Plans",
        description: "Your detail here",
        Icon: Profilecard,
        route: "/",
      },
      {
        name: "Information",
        description: "Your detail here",
        Icon: Thumbs,
        route: "/info",
      },
      {
        name: "Payment",
        description: "Your detail here",
        Icon: Clipboard,
        route: "/payment",
      },
      {
        name: "KYC",
        description: "Your detail here",
        Icon: FileCheck,
        route: "/forms",
      },
      {
        name: "Review",
        description: "Your detail here",
        Icon: FileCheck,
        route: "/review",
      },
    ],
  };
};
