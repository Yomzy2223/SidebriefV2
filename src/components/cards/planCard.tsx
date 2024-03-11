import { Card } from "@/components/flowbite";
import { PlanCardEllipse, PlanCardIllustration } from "@/assets/svg";
import Image from "next/image";
import getCurrencySymbol from "currency-symbol-map";
import numeral from "numeral";
import { CheckCheck } from "lucide-react";
import { ClockIcon, CoinIcon } from "@/assets/images";

export const PlanCard = ({
  features,
  price,
  timeline,
}: {
  features?: string[];
  price: { amount?: number; currency?: string };
  timeline: string;
}) => {
  return (
    <Card className="w-full bg-primary relative overflow-hidden">
      <Image src={PlanCardEllipse} alt="" className="absolute top-0 left-0 z-0" />
      <Image src={PlanCardIllustration} alt="" className="absolute bottom-0 right-0 z-0" />
      <div className="flex gap-12 relative z-10">
        {features ? (
          <div>
            <h6 className="text-white text-xs font-semibold leading-[24px] underline">Features</h6>
            <div className="space-y-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-1">
                  <CheckCheck size={14} color="white" />
                  <p className="text-sm text-white font-medium leading-[21px]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-4 ml-auto text-right space-y-5">
          {price.amount && price.currency ? (
            <div>
              <div className="flex items-center justify-end gap-1 ">
                <Image src={CoinIcon} alt="" className="shrink-0 h-max" />
                <h6 className="text-white text-sm font-medium leading-normal">Total amount</h6>
              </div>
              <p className="text-white font-semibold text-xl leading-normal">
                {getCurrencySymbol(price.currency) || "$"}
                {numeral(price.amount).format("0,0")}
              </p>
            </div>
          ) : null}
          {timeline ? (
            <div>
              <div className="flex items-center justify-end gap-1 ">
                <Image src={ClockIcon} alt="" className="shrink-0 h-max" />
                <h6 className="text-white text-sm font-medium leading-normal">
                  Total time required
                </h6>
              </div>
              <p className="text-white font-semibold text-xl leading-normal">{timeline}</p>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};
