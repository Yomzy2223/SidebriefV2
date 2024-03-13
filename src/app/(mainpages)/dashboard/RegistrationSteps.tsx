import React from 'react'
import Image, { StaticImageData } from 'next/image';
import { CardImage, CmpImage, DocImage, InfoImage } from "@/assets/images" 

interface ServicesTypeProp {
    name: string;
    description: string;
    status: string;
    link?: string;
    icon: StaticImageData;
}

interface BadgeType { 
	status: string; 
}

const RegistrationStages: ServicesTypeProp[] = [
	{
	  name: "STEP 1",
	  description:"Business Registration",
      icon: CardImage,
	  status: "Done"
	},
	{
        name: "STEP 2",
	    description:"Registration Plans",
        icon: CmpImage,
        status: "Not Done"
    },
	{
        name: "STEP 3",
	    description:"Payment",
	    icon: InfoImage,
        status: "Not Done"
	},
	{
        name: "STEP 4",
        description:"Review",
        icon: DocImage,
        status: "Not Done"
	}
]

const StatusType: React.FC<BadgeType> = ({status}) => {
    let badgeColor = '';
    if(status === "Not Done" ? badgeColor = 'red' : badgeColor = 'green')

    return (
		<span className={`inline-block px-2 py-1 text-xs font-semibold text-${badgeColor}-800 bg-${badgeColor}-100 rounded`}>
			{status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}
		</span>
	);
}


const RegistrationSteps = () => {
  return (
    <div className="max-w-12xl">
        <ul role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-8 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-4"
            >
                {RegistrationStages.map((ServicesType) => (
                    <li key={ServicesType.name} className="rounded-2xl border border-gray-200 p-8">
                    
                        <div className="flex items-center justify-between">
                            <Image src={ServicesType.icon} alt="" className="h-12 w-12"/>
                        </div>
                        
                        <h3 className="mt-6 font-semibold text-gray-900">
                            {ServicesType.name}
                        </h3>
                        <p className="mt-2 text-gray-700">{ServicesType.description}</p>
                        <p className="mt-2 text-gray-700">
                            <StatusType status={ServicesType.status}/>
                        </p>
                    </li>
                ))}
        </ul>
    </div>
  )
}

export default RegistrationSteps