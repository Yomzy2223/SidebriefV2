import slugify from "slugify";
import { LaunchForm1 } from "../form";
import { getServices, getServiceForms } from "@/services/service/operations";
import { redirect } from "next/navigation";

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

	const serviceForm1 = serviceData.data.data[0];

	const productId = params.productId?.at(0) || undefined;

	return (
		<div className="flex flex-col gap-6 max-w-[500px]">
			<div className="flex flex-col">
				<h4 className="text-sm leading-normal text-foreground-3 mb-1">
					STEP 1
				</h4>
				<h6 className="text-2xl leading-normal font-semibold">
					{serviceForm1.title}
				</h6>
				<p className="font-medium leading-normal text-primary">
					{serviceForm1.description}
				</p>
			</div>
			<LaunchForm1
				serviceFormId={serviceForm1.id}
				urlProductId={productId}
			/>
		</div>
	);
}
