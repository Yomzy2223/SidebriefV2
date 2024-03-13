import { Badge, Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";

import Image, { StaticImageData } from "next/image";
import Activity from "@/components/activiity";
import DateBar from "@/components/business/business";
import { Download, DetailIcon, CalcIcon, Settings } from "@/assets/svg";
import { imageTypeImage } from "@/lib/utils";
import ServicesList from "@/components/services/ServicesList";
interface File {
	id?: string;
	name: string;
	type: string;
}

interface BadgeProps {
	size?: 'sm' | 'lg'; 
	status: 'Pending' | 'Ongoing' | 'Completed' | 'Submitted'; 
  }
const files: File[] = [
	{
	  id: "1",
	  name: "Statement of account",
	  type: "application/pdf",
	},

	{
	  id: "2",
	  name: "National ID Card",
	  type: "image/png",
	},

	{
	  id: "3",
	  name: "Passport photograph",
	  type: "image/jpeg",
	},

	{
		id: "4",
		name: "Proof of Address",
		type: "image/png",
	},
]

const ApplicationBadge: React.FC<BadgeProps> = ({ size = 'sm', status  }) => {
	let badgeColor = '';
  
	switch (status) {
	  case 'Pending':
		badgeColor = 'red';
		break;
	  case 'Ongoing':
		badgeColor = 'yellow';
		break;
	  case 'Completed':
		badgeColor = 'pink';
		break;
	  case 'Submitted':
		badgeColor = 'green';
		break;
	  default:
		badgeColor = 'gray';
	}
  

	return (
		<span className={`inline-block px-2 py-1 text-xs font-semibold text-${badgeColor}-800 bg-${badgeColor}-400 rounded ${size === 'sm' ? 'text-sm' : 'text-xs'}`}>
			{status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}
		</span>
	);
  };
  

const renderFile = (file: File) => {
	const fileType = imageTypeImage.find((type) => type.type === file.type);
  
	if (fileType) {
	  return (
		
		<span className="flex items-center justify-between" key={file.id}>
			<Image src={fileType.image} alt={file.name} className="mr-2 w-6 h-6" />
			<span className="flex items-center flex-grow ">
				<span className="underline mr-16">
				{file.name}
				</span>
				<p className="text-primary ml-auto">
				<Image src={Download} alt="Download" />
				</p>
			</span>
		</span>
	  );
	}
  
	return null; 
};

export default function DashboardFirst() {
	return (
		<div className="p-8 relative">
			<div className="flex flex-col sm:flex-row">
				<div className="px-0 sm:px-0">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							Welcome to Sidebrief, Joshua
						</h1>
						
					</div>
					<p className="mt-2 text-sm text-gray-500">
						We are glad to have you join the 22,000,000 people all over the world who manage their businesses using the simplest and easiest business solution.
					</p>
				</div>

				<div className="sm:hidden w-full mt-6">
					<Button color="magenta" size={"lg"} className="self-start">
						<div className="space-x-2 flex items-center">
							<p>Register New Business</p>
							<ArrowRight />
						</div>
					</Button>
				</div>
			</div>

			<div className="hidden sm:block">
				<Button color="magenta" size={"lg"} className="mr-7 self-start mt-8 absolute top-0 right-0">
					<div className="space-x-2 flex items-center">
						<p>Register New Business</p>
						<ArrowRight />
					</div>
				</Button>
			</div>


			<div className="px-0 sm:px-0 mt-12">
				<div className="flex items-center">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						Handpicked for you
					</h1>
					
				</div>
				<p className="mt-2 text-sm text-gray-500">
				Here are suggested services you can start with
				</p>
			</div>

			<ServicesList/>
			
		</div>

	);
}
