import Image from "next/image";
import Ellipse2 from "./Ellipse 2.svg";
import Ellipse3 from "./Ellipse3.svg";

export const OnboardPanel = () => {
  return (
    <div className="max-w-[720px] bg-[#00A2D41A] text-white relative overflow-hidden h-[100vh]">
      <Image src={Ellipse3} alt="" className="absolute z-0 right-0 top-32" />

      <div className="py-[70px] px-[49px] relative">
        <div className="space-y-0.5">
          <h6 className="text-lg font-semibold text-black">Business Profile</h6>
          <p className="text-sm text-black pt-2">Now continue the process of registering your business</p>
        </div>
      </div>
    </div>
  );
};
