import { ReactNode } from "react";
import { Header } from "@/components/navbar/header";

const Successlayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<div className="mx-4 md:mx-8">
				<Header />
			</div>
			{children}
		</div>
	);
};

export default Successlayout;
