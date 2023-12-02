import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Message } from "@/components/features/messageBar";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Navbar />
			<Message />
			{children}
		</div>
	);
};

export default Dashboardlayout;
