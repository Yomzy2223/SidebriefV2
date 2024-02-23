import slugify from "slugify";
import { LaunchForm1 } from "./form";
import { getServices, getServiceForms } from "@/services/service/operations";
import { redirect } from "next/navigation";
import { Tabs, TabItem } from "@/components/flowbite";

export const dynamic = "force-dynamic";

export default async function LaunchStart({
	params,
}: {
	params: { service: string; productId: string[] };
}) {
	const data = await getServices();

	const services = data.data.data;

	const serviceSlug = params.service;

	const service = services.find(
		(service) => slugify(service.name) === serviceSlug
	);

	if (!service) {
		redirect("/dashboard");
	}

	const serviceData = await getServiceForms({ serviceId: service.id });

	const allServiceForms = serviceData.data.data;

	const serviceForm1 = allServiceForms[0];

	const productId = params.productId?.at(0) || undefined;

	return (
		<div className="flex flex-col gap-2 max-w-[500px] w-full">
			<h4 className="text-sm leading-normal text-foreground-3 mb-1">
				STEP 1
			</h4>
			{allServiceForms.length > 1 ? (
				<Tabs aria-label="Form tabs" style="underline">
					{allServiceForms.map((el) => (
						<TabItem active title={el.title} key={el.id}>
							<div className="space-y-5 w-full">
								<div className="flex flex-col">
									<h6 className="text-2xl leading-normal font-semibold">
										{el.title}
									</h6>
									<p className="font-medium leading-normal text-primary">
										{el.description}
									</p>
								</div>
								<LaunchForm1
									subForms={el.subForm}
									urlProductId={productId}
								/>
							</div>
						</TabItem>
					))}
				</Tabs>
			) : (
				<div className="space-y-5 w-full">
					<div className="flex flex-col">
						<h6 className="text-2xl leading-normal font-semibold">
							{serviceForm1.title}
						</h6>
						<p className="font-medium leading-normal text-primary">
							{serviceForm1.description}
						</p>
					</div>
					<LaunchForm1
						subForms={serviceForm1.subForm}
						urlProductId={productId}
					/>
				</div>
			)}
		</div>
	);
}
