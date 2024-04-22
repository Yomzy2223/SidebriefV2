import { LaunchForm1 } from "./form";
import { getServices, getServiceForms } from "@/services/service/operations";
import { redirect } from "next/navigation";
import { ProductTabs } from "./tabs";
import { sluggify } from "@/lib/utils";
import { GetBusinessRequest } from "@/services/business/operations";

export const dynamic = "force-dynamic";

export default async function LaunchInfo({
  params,
}: {
  params: { service: string; processId: string };
}) {
  const data = await getServices();

  if (!params.processId) {
    redirect(`/dashboard/${params.service}`);
  }

  const services = data.data.data;

  const serviceSlug = params.service;

  const service = services.find((service) => sluggify(service.name) === serviceSlug);
  if (!service) {
    redirect("/dashboard");
  }

  const serviceData = await getServiceForms({ serviceId: service.id });

  const allServiceForms = serviceData.data.data;

  const serviceForm1 = allServiceForms[0];

  const processId = params.processId;

  const process = await GetBusinessRequest({ id: processId });

  const processData = process.data.data;

  const productId = processData.productRequest[0].id;

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 2</h4>
      {allServiceForms.length > 1 ? (
        <ProductTabs allServiceForms={allServiceForms} productId={productId} />
      ) : (
        <div className="space-y-5 w-full">
          <div className="flex flex-col">
            <h6 className="text-2xl leading-normal font-semibold">{serviceForm1.title}</h6>
            <p className="font-medium leading-normal text-primary">{serviceForm1.description}</p>
          </div>
          <LaunchForm1 urlProductId={productId} form={serviceForm1} />
          <>form</>
        </div>
      )}
    </div>
  );
}
