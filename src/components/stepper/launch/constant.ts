import { Thumbs, Profilecard, Clipboard, FileCheck } from "@/assets/icons";
import { useParams } from "next/navigation";

export const useLaunchSteps = () => {
	const params: { service: string; productId: string | string[] } =
		useParams();

	let productId = Array.isArray(params.productId)
		? params.productId[0]
		: params.productId;

	return {
		productId,
		launchSteps: [
			{
				name: "Plans",
				description: "Your detail here",
				Icon: Profilecard,
				link: `/dashboard/${params.service}/${productId || ""}`,
			},
			{
				name: "Information",
				description: "Your detail here",
				Icon: Thumbs,
				link: `/dashboard/${params.service}/info/${productId || ""}`,
			},
			{
				name: "Payment",
				description: "Your detail here",
				Icon: Clipboard,
				link: `/dashboard/${params.service}/payment/${productId || ""}`,
			},
			{
				name: "KYC",
				description: "Your detail here",
				Icon: FileCheck,
				link: `/dashboard/${params.service}/kyc/${productId || ""}`,
			},
			{
				name: "Review",
				description: "Your detail here",
				Icon: FileCheck,
				link: `/dashboard/${params.service}/review/${productId || ""}`,
			},
		],
	};
};
