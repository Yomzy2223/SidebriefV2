import { useState } from "react";
import Image from "next/image";
import Ellipse2 from "./Ellipse 2.svg";
import Ellipse3 from "./Ellipse3.svg";
import Link from "next/link";
import FAQ from "@/components/faqs";
interface FaqDataProps {
  header: string;
  description: string;
}
const faqData: FaqDataProps[] = [
  {
    header: "What do you mean by NIN?.",
    description:
      "National Identification Number is a 10-digit number commonly used in certain African countries such as Nigeria as a means of identification, you can get this from any of the officially accredited governmental parastatal.",
  },
  {
    header: "What do you mean by SCUML?.",
    description:
      "National Identification Number is a 10-digit number commonly used in certain African countries such as Nigeria as a means of identification, you can get this from any of the officially accredited governmental parastatal.",
  },
  {
    header: "What is PCI-DSS Compliance?",
    description:
      "National Identification Number is a 10-digit number commonly used in certain African countries such as Nigeria as a means of identification, you can get this from any of the officially accredited governmental parastatal.",
  },
  {
    header: "How Can I Ensure Tax Compliance?",
    description:
      "To ensure tax compliance, individuals and businesses should keep accurate financial records, stay informed about tax laws and regulations, and seek professional assistance if needed. Additionally, timely filing of tax returns and payment of taxes owed is crucial.",
  },
  {
    header: "What Are Common Tax Compliance Issues?",
    description:
      "Common tax compliance issues include underreporting of income, claiming improper deductions or credits, failure to file tax returns, and late payment of taxes owed. These issues can result in penalties, interest charges, and other consequences.",
  },
];

export const RequestInfoPanel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Initial active item

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index); // Toggle active state
  };
  return (
    <div className="max-w-[720px] bg-[#00A2D41A] text-white relative overflow-hidden h-[100vh]">
      {/* <Image
				src={Ellipse1}
				alt=""
				className="absolute z-0 right-0 bottom-0 "
			/> */}

      <Image src={Ellipse3} alt="" className="absolute z-0 right-0 top-32" />

      <Image src={Ellipse2} alt="" className="absolute top-0 z-0 h-full" />
      <div className="py-[70px] px-[49px] relative">
        <div className="space-y-0.5">
          <h6 className="text-lg font-semibold text-black">Business Description</h6>
          <p className="text-sm text-black pt-2">
            Now continue the process of registering your business without the need for any physical
            paperwork.
          </p>
          <Link href="" className="text-primary mt-2">
            Read more
          </Link>
        </div>

        <div className="space-y-[10px]">
          <p className="text-gray-700 text-lg font-bold mt-3">Frequently Asked Questions.</p>
          <div>
            <FAQ data={faqData} />
          </div>
        </div>
      </div>
    </div>
  );
};
