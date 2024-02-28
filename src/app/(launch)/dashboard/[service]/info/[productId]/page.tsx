import slugify from "slugify";
import { LaunchForm1 } from "./form";
import { getServices, getServiceForms } from "@/services/service/operations";
import { redirect } from "next/navigation";
import { ProductTabs } from "./tabs";

export const dynamic = "force-dynamic";

export default async function LaunchStart({
  params,
}: {
  params: { service: string; productId: string };
}) {
  const data = await getServices();

  if (!params.productId) {
    redirect(`/dashboard/${params.service}`);
  }

  const services = data.data.data;

  const serviceSlug = params.service;

  const service = services.find((service) => slugify(service.name) === serviceSlug);
  if (!service) {
    redirect("/dashboard");
  }

  const serviceData = await getServiceForms({ serviceId: service.id });

  const allServiceForms = serviceData.data.data;

  const serviceForm1 = allServiceForms[0];

  const productId = params.productId;

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
        </div>
      )}
    </div>
  );
}
