"use client"
import React, { useState} from 'react';
import Image, { StaticImageData } from 'next/image';
import { Timer, DotsIcon, EllipsisVertical } from '@/assets/svg';
import Link from 'next/link';

const ActivityCard = ({
    icon,
    message,
    duration,
    link

}:{
    icon: StaticImageData
    message: string
    duration:string
    link?: string
}) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleSortDropdown = () => {
        setDropdownOpen((prev) => !prev);
      };

    return (
        <div className="flex flex-col p-5 bg-white">
            <div className="flex items-center justify-between pt-4">
                <div className="flex items-center">
                    <Image src={icon} alt="" quality={100} />
                    <div className="flex flex-col ml-3">
                        <div className="font-normal leading-none text-sb-text-14 md:text-sb-text-16">
                            {message}
                            <span className="pl-2 text-[#00A2D4] font-semibold">
                                <Link href="#">
                                    {link}
                                </Link>
                            </span>
                        </div>
                        <div className="flex items-center mt-3">
                            <span className="pr-2">
                                <Image src={Timer} alt="" quality={100}/>
                            </span>
                            <p className="text-sm text-gray-600 leading-none">
                                {duration}
                            </p>
                        </div>

                    </div>
                </div>
                <div className={`${
                    isDropdownOpen ? '' : 'hidden'
                    } absolute right-0 z-10 mt-20 mr-24 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                >
                    <p className="block px-3 py-1 text-sm leading-6 text-gray-700">Send reminder</p>
                    <p className="block px-3 py-1 text-sm leading-6 text-gray-700" >Fill by yourself</p>
                </div>
                <div onClick={toggleSortDropdown}>
                    <Image src={EllipsisVertical} alt="" quality={100} />
                </div>
            </div>
        </div>

        
    );
};

export default ActivityCard;
