import { Button, Card } from "@/components/flowbite";
import { CheckBullet } from "../reuseables/checkBullet";
import { PlanCardEllipse, PlanCardIllustration } from "@/assets/svg";
import Image from "next/image";
import getCurrencySymbol from "currency-symbol-map";

export const PlanCard = () => {
	return (
		<Card className="w-full bg-primary relative overflow-hidden">
			<Image
				src={PlanCardEllipse}
				alt=""
				className="absolute top-0 left-0 z-0"
			/>
			<Image
				src={PlanCardIllustration}
				alt=""
				className="absolute bottom-0 right-0 z-0"
			/>
			<div className="flex gap-12 relative z-10">
				<div>
					<h6 className="text-white text-xs font-semibold leading-[24px] underline">
						Features
					</h6>
					<div className="space-y-2">
						{mock.map((feature, i) => (
							<p
								key={i}
								className="text-sm text-white font-medium leading-[21px]"
							>
								{feature}
							</p>
						))}
					</div>
				</div>
				<div>
					<h6 className="text-white text-xs font-semibold leading-[24px] underline">
						Documents
					</h6>
					<div className="space-y-2">
						{mock.map((document, i) => (
							<p
								key={i}
								className="text-sm text-white font-medium leading-[21px]"
							>
								{document}
							</p>
						))}
					</div>
				</div>
				<div className="mt-4 ml-auto text-right space-y-5">
					<div>
						<h6 className="text-white text-sm font-medium leading-normal">
							Total amount
						</h6>
						<p className="text-white font-semibold text-xl leading-normal">
							{getCurrencySymbol("NGN") || "$"}72,000
						</p>
					</div>
					<div>
						<h6 className="text-white text-sm font-medium leading-normal">
							Total time required
						</h6>
						<p className="text-white font-semibold text-xl leading-normal">
							20-30 Days
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

const mock = [
	"standard",
	"standard",
	"standard",
	"standard",
	"standard",
	"standard",
	"standard",
	"standard",
];
