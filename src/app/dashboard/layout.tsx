import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default Dashboardlayout;
