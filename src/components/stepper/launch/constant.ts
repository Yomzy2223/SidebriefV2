import { Thumbs, Profilecard, Clipboard, FileCheck } from "@/assets/icons";
import { useParams } from "next/navigation";

export const useLaunchSteps = () => {
  const params: { service: string; processId: string | string[] } = useParams();

  let productId = Array.isArray(params.processId) ? params.processId[0] : params.processId;

  return {
    productId,
    launchSteps: [
      {
        name: "Plans",
        description: "Your detail here",
        Icon: Profilecard,
        link: `/request/${params.service}/${productId || ""}`,
      },
      {
        name: "Information",
        description: "Your detail here",
        Icon: Thumbs,
        link: `/request/${params.service}/info/${productId || ""}`,
      },
      {
        name: "Payment",
        description: "Your detail here",
        Icon: Clipboard,
        link: `/request/${params.service}/payment/${productId || ""}`,
      },
      {
        name: "KYC",
        description: "Your detail here",
        Icon: FileCheck,
        link: `/request/${params.service}/kyc/${productId || ""}`,
      },
      {
        name: "Review",
        description: "Your detail here",
        Icon: FileCheck,
        link: `/request/${params.service}/review/${productId || ""}`,
      },
    ],
  };
};
