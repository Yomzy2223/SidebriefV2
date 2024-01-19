import React from 'react'

interface ServicesTypeProp {
    name: string;
    description: string;
    status: string;
    link?: string;
} 

interface BadgeType { 
	status: string; 
}

const RegistrationStages: ServicesTypeProp[] = [
	{
	  name: "Business Registration",
	  description:"Go to this step by step guideline process on how to certify for your weekly benefits:",
	  status: "Completed"
	},
	{
        name: "Tax",
	    description:"Go to this step by step guideline process on how to certify for your weekly benefits:",
        status: "See our guidelines"
    },
	{
        name: "Bank Account",
	    description:"Go to this step by step guideline process on how to certify for your weekly benefits:",
        status: "See our guidelines"
	},
	{
        name: "Intellectual Properties",
        description:"Go to this step by step guideline process on how to certify for your weekly benefits:",
        status: "See our guidelines"
	}
]

const StatusType: React.FC<BadgeType> = ({status}) => {

    return (
		<span className={`inline-block py-1 text-xs font-semibold text-[#1C64F2] rounded`}>
			{status ? status.charAt(0) + status.slice(1) : ''}
		</span>
	);
}

const ServiceTypes = () => {
  return (
    <div className="max-w-12xl">
        <ul role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-8 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-4"
            >
                {RegistrationStages.map((ServicesType) => (
                    <li key={ServicesType.name} className="rounded-2xl border border-gray-200 p-8">    
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

export default ServiceTypes