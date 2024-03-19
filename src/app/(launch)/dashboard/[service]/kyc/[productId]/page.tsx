import { ProductInfoForm } from "./productinfoform";
import { ProprietorForm } from "./proprietorform";
import { Forms } from "./forms";
import { getProductRequest, getProductForm } from "@/services/product/operations";
import { redirect } from "next/navigation";

export default async function KYCpage({
  params: { productId, service },
}: {
  params: { service: string; productId: string };
}) {
  const productRequest = await getProductRequest({ productRequestId: productId });

  const selectedProduct = productRequest.data.data.productId || "";

  if (selectedProduct === "") {
    redirect("/dashboard/" + service);
  }

  const productForm = await getProductForm({ productId: selectedProduct });

  console.log(productForm.data.data);

  return (
    <div className="flex flex-col max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 4</h4>
      <div className="space-y-20">
        <Forms forms={productForm.data.data} />
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
            Proprietors Details
          </h6>
          <p className="font-medium leading-normal text-primary mb-5">
            Supply stakeholder(s) documents
          </p>
          <ProprietorForm />
        </div> */}
      </div>
    </div>
  );
}
