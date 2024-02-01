import slugify from "slugify";
import { LaunchForm1 } from "./form";
import { getServices } from "@/services/service/operations";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LaunchStart({
	params,
}: {
	params: { service: string };
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

	return (
		<div className="flex flex-col gap-6 max-w-[500px]">
			<div className="flex flex-col">
				<h4 className="text-sm leading-normal text-foreground-3 mb-1">
					STEP 1
				</h4>
				<h6 className="text-2xl leading-normal font-semibold">
					Business profile
				</h6>
				<p className="font-medium leading-normal text-primary">
					Give the business a face
				</p>
			</div>
			<LaunchForm1 serviceId={service.id} />
		</div>
	);
}
