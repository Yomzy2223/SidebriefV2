import { Button, Card } from "@/components/flowbite";
import { CheckBullet } from "../reuseables/checkBullet";

export const PlanCard = () => {
	return (
		<Card className="w-full md:max-w-[500px]">
			<div className="space-y-6">
				<div className="flex justify-between items-start">
					<div className="space-y-1.5">
						<h3 className="text-lg leading-normal font-semibold">
							Basic business registration
						</h3>
						<p className="text-sm text-gray-500 leading-normal">
							Approval within 2-3 days
						</p>
					</div>
					<p className="text-2xl font-semibold text-primary leading-normal">
						N15,000
					</p>
				</div>
				<div className="flex justify-between items-start">
					<ol className="space-y-2">
						<CheckBullet>Private company</CheckBullet>
						<CheckBullet>Local Shareholders Only</CheckBullet>
						<CheckBullet active={false}>10000 shares</CheckBullet>
						<CheckBullet active={false}>Standard</CheckBullet>
					</ol>
					<Button color="link" size={"fit"} className="self-end">
						See details
					</Button>
				</div>
			</div>
		</Card>
	);
};
