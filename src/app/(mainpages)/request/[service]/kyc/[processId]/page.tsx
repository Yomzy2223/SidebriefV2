import { ProductInfoForm } from "./productinfoform";
import { Forms } from "./forms";
import { getProductRequest, getProductForm } from "@/services/product/operations";
import { redirect } from "next/navigation";
import { GetProcessRequest } from "@/services/business/operations";

export default async function KYCpage({
  params: { processId, service },
}: {
  params: { service: string; processId: string };
}) {
  const process = await GetProcessRequest({ id: processId });

  const processData = process.data.data;

  const productRequestId = processData.productRequest[0].id;

  const productRequest = await getProductRequest({ productRequestId: productRequestId });

  const selectedProduct = productRequest.data.data.productId || "";

  if (selectedProduct === "") {
    redirect("/dashboard/" + service);
  }

  const productForm = await getProductForm({ productId: selectedProduct });

  if (productForm.data.data.length === 0) {
    // TODO: redirect to next pag, since there is no form
  }

  return (
    <div className="flex flex-col max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 4</h4>
      <div className="space-y-20">
        <Forms forms={productForm.data.data} productId={productRequestId} />
        {/* <div>
          <h6 className="text-2xl leading-normal font-semibold">
            Product Info
          </h6>
          <p className="font-medium leading-normal text-primary mb-5">
            Supply stakeholder(s) documents
          </p>
          <ProductInfoForm />
        </div>
        <div>
          <h6 className="text-2xl leading-normal font-semibold">
            Members Details
          </h6>
          <p className="font-medium leading-normal text-primary mb-5">
            Supply stakeholder(s) documents
          </p>
          <MemberForm />
        </div> */}
      </div>
    </div>
  );
}
