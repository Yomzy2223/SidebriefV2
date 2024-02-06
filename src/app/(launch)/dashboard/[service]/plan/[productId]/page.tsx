"use client";
import React, { useState } from "react";
import { Plans } from "../plans";
import { Button, Card } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { BankIcon, CardIcon, CreditCardIcon } from "@/assets/svg";
import Image from "next/image";
import { ServicesModal } from "@/components/services/ServicesModal";
import { X } from "lucide-react";
import { ProceedPayModal } from "../ProceedPayModal";
const tabs = [
	{ name: "Bank Transfer", href: "#", icon: BankIcon, current: false },
	{ name: "Card Payment", href: "#", icon: CardIcon, current: false },
	{ name: "Bank USSD", href: "#", icon: CreditCardIcon, current: false },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}
export default function RegistrationPlan() {
	const [openModal, setOpenModal] = useState(false);

	const [openDiv, setOpenDiv] = useState(false);

	const handleRemoveDiv = () => {
		setOpenDiv(false);
	};

	const closeModal = () => {
		setOpenModal(false);
	};
	const [currentTab, setCurrentTab] = useState(
		tabs.find((tab) => tab.current)
	);

	// const handleTabChange = (selectedTab) => {
	// 	setCurrentTab(selectedTab);
	// };
	return (
		<div className="flex flex-col gap-6 md:max-w-[500px] w-full">
			<div className="flex flex-col">
				<h4 className="text-sm leading-normal text-foreground-3 mb-1">
					STEP 2
				</h4>
				<h6 className="text-2xl leading-normal font-semibold">
					Registration Plan
				</h6>
			</div>
			<Plans />

			<Button
				color="secondary"
				size={"lg"}
				className="self-start"
				onClick={() => setOpenModal(true)}
			>
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>

			{/* <div className='p-5 border'>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<h6 className="text-2xl leading-normal font-semibold text-primary">
							Before you proceed to payment
						</h6>
						<p className='py-4'>See other things you can do alongside side your business registration to save time. It may require additional documents and increase in payment</p>
					</div>
				</div>


				<Button color="secondary" size={"lg"} className="self-start" onClick={() => setOpenModal(true)}>
					<div className="space-x-2 flex items-center">
						<p>Continue</p>
						<ArrowRight />
					</div>
				</Button>

			</div> */}

			{/* <ProceedPayModal open={openModal} close={closeModal}/> */}
			<ServicesModal open={openModal} close={closeModal} />
		</div>
	);
}
