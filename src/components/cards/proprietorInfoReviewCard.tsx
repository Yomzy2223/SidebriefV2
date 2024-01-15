"use client";

import { Card, Badge, Button } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink } from "lucide-react";
import { CheckBullet } from "../reuseables/checkBullet";

export const ProprietorInfoReviewCard = () => {
	return (
		<Card className="w-full md:min-w-[480px] md:max-w-[calc(50%-12px)]">
			<div className="grid grid-cols-[50px,1fr] grid-row-[repeat(2,fit-content)] gap-x-2.5 gap-y-7">
				<div className="bg-primary text-white w-[50px] h-[50px] rounded-full grid place-items-center">
					SO
				</div>
				<div className="flex justify-between items-center">
					<Badge color={"green"} icon={SwatchBook}>
						Shareholder 1
					</Badge>
					<Button color="link" size={"fit"}>
						<div className="flex gap-2 items-center">
							See details <ExternalLink size={16} />
						</div>
					</Button>
				</div>
				<div className="col-start-2">
					<h6 className="text-2xl font-semibold leading-normal">
						Sayo Oluwole
					</h6>

					<p className="text-foreground-5 leading-normal">
						Sayoluwole@gmail.com
					</p>

					<div className="mt-3.5 flex-col sm:flex-row flex flex-wrap gap-2">
						<CheckBullet grey>10% share allocated</CheckBullet>
						<CheckBullet grey>HT Share Type</CheckBullet>
					</div>
				</div>
			</div>
		</Card>
	);
};
