import Image from "next/image";
import Ellipse2 from "./Ellipse 2.svg";
import Ellipse3 from "./Ellipse3.svg";
import { useGetProductFAQsQuery } from "@/services/faq";
import { TProduct } from "@/services/service/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const RequestInfoPanel = ({ productInfo }: { productInfo?: TProduct }) => {
  const productFAQsRes = useGetProductFAQsQuery(productInfo?.id || "");
  const productFAQs = productFAQsRes.data?.data?.data;

  return (
    <div className="max-w-[720px] bg-[#00A2D41A] text-white relative overflow-hidden h-[100vh]">
      <Image src={Ellipse3} alt="" className="absolute z-0 right-0 top-32" />

      <Image src={Ellipse2} alt="" className="absolute top-0 z-0 h-full" />
      <div className="py-[70px] px-[49px] relative">
        <div className="space-y-0.5">
          <h6 className="text-lg font-semibold text-black">Product Description</h6>
          <p className="text-sm text-black pt-2">{productInfo?.description}</p>
        </div>

        <div className="space-y-[10px]">
          <p className="text-gray-700 text-lg font-bold mt-3">Frequently Asked Questions.</p>
          <Accordion type="single" collapsible className="w-full text-gray-900 bg-transparent">
            {productFAQs?.map((item) => (
              <AccordionItem key={item.id} value={item.answer} className="bg-white mt-4 px-3">
                <AccordionTrigger className="text-gray-900">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <hr className="p-2" />
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
