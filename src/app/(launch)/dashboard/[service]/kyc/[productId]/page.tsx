import { ProductInfoForm } from "./productinfoform";
import { ProprietorForm } from "./proprietorform";

export default function KYCpage() {
  return (
    <div className="flex flex-col max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 4</h4>
      <div className="space-y-20">
        <div>
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
        </div>
      </div>
    </div>
  );
}
