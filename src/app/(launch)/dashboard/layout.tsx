"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Message } from "@/components/features/messageBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Back } from "./back";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
	const matches = useMediaQuery("(min-width: 768px)");

	return (
		<div>
			{matches ? (
				<>
					<Navbar />
					<Message />
				</>
			) : (
				<div className="mx-4 md:mx-8 mt-4">
					<Back />
				</div>
			)}
			{children}
		</div>
	);
};

export default Dashboardlayout;
