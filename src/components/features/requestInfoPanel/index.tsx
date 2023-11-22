import Image from "next/image";
import Ellipse1 from "./Ellipse 1.svg";
import Ellipse2 from "./Ellipse 2.svg";
import image from "./image.png";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "lucide-react";

export const RequestInfoPanel = () => {
	return (
		<div className="max-w-[470px] h-full bg-primary text-white relative overflow-hidden">
			<Image
				src={Ellipse1}
				alt=""
				className="absolute z-0 right-0 bottom-0"
			/>
			<Image
				src={Ellipse2}
				alt=""
				className="absolute top-0 z-0 h-full"
			/>
			<div className="py-[70px] px-[49px] relative">
				<div className="space-y-0.5">
					<h6 className="text-2xl font-semibold">Business Profile</h6>
					<p className="text-sm">
						Now continue the process of registering your business
						without the need for any physical paperwork.
					</p>
				</div>
				<Image src={image} alt="" className="mt-[29px] mb-10" />
				<div className="space-y-[30px]">
					<p className="text-lg leading-[1.3] font-medium">
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick, but big enough to deliver the scope you want at
						the pace you need.
					</p>
					<p className="text-lg leading-[1.3] font-medium">
						We are strategists, designers and developers. Innovators
						and problem solvers. Small enough to be simple and
						quick.
					</p>
					<Button outline color="white">
						Read more <ArrowRight size={20} strokeWidth={1.5} />
					</Button>
				</div>
			</div>
		</div>
	);
};
