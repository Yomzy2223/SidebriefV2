import Link from 'next/link';
import Image from 'next/image'
import { Card } from  "@/components/flowbite";
import { HiCheckCircle } from "react-icons/hi";
import { AngleIcon, LinkIcon } from "@/assets/svg";


const cardData = [
  { id: 1, initials: 'SO', name: 'Sayo Oluwole', email: 'sayooluwole@gmail.com', shareAllocated: 10 },
  { id: 2, initials: 'AW', name: 'Ado Wale', email: 'adewale@gmail.com', shareAllocated: 15 },
  { id: 3, initials: 'AB', name: 'Albert Bright', email: 'albertbright@gmail.com', shareAllocated: 20 },
  { id:4, initials: 'CD', name: 'Chris Doe', email: 'chris.doe@example.com', shareAllocated: 12 },
  { id:5, initials: 'EF', name: 'Emily Fox', email: 'emily.fox@example.com', shareAllocated: 18 },
];

const PersonInfoCard = ({
    id,
    initials,
    name,
    email,
    shareAllocated,
}:{ 
    id: number
    initials: string
    name:string
    email:string,
    shareAllocated: number
}) => {
    
  
 return (
    // <div className="w-[400px] p-5 pl-6 border border-gray-300 rounded-md ">
    <div className="w-full md:min-w-[480px] md:max-w-[calc(50%-12px)]">
      <div className='flex flex-row'>
        <div className="w-[15%]">
          <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center">
            {initials}
          </div>
        </div>

        <div className="w-[85%]">
          <div className="flex items-center justify-between mb-4 text-primary">
            <div className="flex gap-2 bg-[#DEF7EC] p-2 ">
              <div className="mt-1">
                <Image
                  src={AngleIcon}
                  alt="Angle icon"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
              <span className="text-xs dark:text-white text-gray-700 mt-1"> Shareholder {id} </span>
            </div>

            <div className='flex'>
              <Link href="" className='pr-2'>
                See Details
              </Link>
              <div className="mt-1">
                <Image
                  src={LinkIcon}
                  alt="Angle icon"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
            </div>

          </div>

          <h5 className="text-2xl font-bold tracking-tight  text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pt-2">
            {email}
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start pt-3 text-xs text-gray-700">
            <div className="flex items-center  justify-center whitespace-nowrap md:justify-start sm:mr-3">
              <span className="mr-1 text-[#4E5152]">
                <HiCheckCircle/>
              </span>
              <p>{shareAllocated} Share allocated</p>
            </div>

            <div className="flex items-center  justify-center whitespace-nowrap md:justify-start">
              <span className="mr-1 text-[#4E5152]">
                <HiCheckCircle/>
              </span>
              <p>HT Share Type</p>
            </div>

          </div>
          <div className="mt-3.5 flex-col sm:flex-row flex flex-wrap gap-2">
						{/* <CheckBullet grey>10% share allocated</CheckBullet>
						<CheckBullet grey>HT Share Type</CheckBullet> */}
					</div>
        </div>

      </div>
    </div>
 );

 

 
};

const PersonInfo = () => {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <div className="mx-8">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {cardData.map((data, index) => (
        <PersonInfoCard key={index} {...data} />
      ))}
    </div>
    </div>
  );
} 

export default PersonInfo;