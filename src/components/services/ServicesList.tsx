import React from 'react'
import Image, { StaticImageData } from "next/image";
import { Rocket } from "@/assets/images"
import { Download, DetailIcon, CalcIcon, Settings } from "@/assets/svg";

interface ServiceProps {
	name: string;
	description: string;
	icon: StaticImageData;
}

const features: ServiceProps[] = [
	{
	  name: 'Register my business',
	  description:
		'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Rocket,
	},
	{
	  name: 'Manage my business',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Settings,
	},
	{
	  name: 'Manage my business',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Settings,
	},
	{
	  name: 'Diligence',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: CalcIcon,
	},
	{
	  name: 'Register my business',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Rocket,
	},
]
const ServicesList = () => {
  return (
    <div className="max-w-12xl">
        <ul role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-8 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
            >
                {features.map((feature) => (
                    <li key={feature.name} className="rounded-2xl border border-gray-200 p-8">
                    
                    <div className="flex items-center justify-between">
                        <Image src={feature.icon} alt="" className="h-8 w-8"/>
                        <h4 className="text-primary">See process details</h4>
                    </div>
                    
                    <h3 className="mt-6 font-semibold text-gray-900">
                        {feature.name}
                    </h3>
                    <p className="mt-2 text-gray-700">{feature.description}</p>
                    </li>
                ))}
        </ul>
    </div>
  )
}

export default ServicesList