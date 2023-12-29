"use client"
import React, { useState } from 'react';
import { Plans } from "./plans";
import { Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { BankIcon, CardIcon, CreditCardIcon } from "@/assets/svg";
import Image from "next/image";

const tabs = [
	{ name: 'Bank Transfer', href: '#', icon: BankIcon, current: false },
	{ name: 'Card Payment', href: '#', icon: CardIcon, current: false},
	{ name: 'Bank USSD', href:  '#',icon: CreditCardIcon, current: false },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
  }
export default function RegistrationPlan() {
	const [currentTab, setCurrentTab] = useState(tabs.find((tab) => tab.current));

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
				{/* <p className="font-medium leading-normal text-primary">
					Give the business a face
				</p> */}
			</div>
			<Plans />

			<div>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<h6 className="text-2xl leading-normal font-semibold">
							Choose your Payment Choice
						</h6>
						
						<div className="sm:block">
							<nav className="flex space-x-4" aria-label="Tabs">
								{tabs.map((tab) => (
								<a
									key={tab.name}
									href={tab.href}
								>
									<div className="flex flex-col items-center p-4">
										<Image src ={tab.icon} quality={100} alt=""/>
										<h3 className="font-medium text-md leading-normal text-center mt-2">{tab.name} </h3>
									</div>
								</a>
								))}
							</nav>
						</div>
					</div>
				</div>
			</div>

			<Button color="magenta" size={"lg"} className="self-start" href="/dashboard/launch/payment">
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>
		</div>
	);
}
