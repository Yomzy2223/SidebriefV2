import React from 'react'
import { Badge, Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons"
import Image from 'next/image';

interface ProfileHeaderProps {
    businessName: string;
    address: string;
    status: string;
    date: string;
}
const ProfileHeaderLayout: React.FC<ProfileHeaderProps> = ({
    businessName,
    address,
    status,
    date,
}) => {
  return (
    <div className="flex flex-col sm:flex-row">
            <div className="px-0 sm:px-0">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {businessName}
                    </h1>
                    <span className="ml-2">
                        <div className="w-28">
                            <Badge size="sm" color="yellow">
                                My Business
                            </Badge>
                        </div>
                    </span>
                </div>
                
                <p className="mt-2 text-sm text-gray-500">
                    {address}
                </p>

                

                <div className="flex items-center mt-2">
                    <div className="mr-4">
                        <Badge size="sm" color="green">
                       { status}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{date}</p>
                    </div>
                </div>

                
				<div className="sm:hidden w-full mt-6 flex flex-col">
                    <Button color="white" size="lg" className="w-full items-center justify-center text-black self-start mb-4 cursor-pointer rounded-lg border-2 border-gray-200">
                        
                        <div className="flex items-center justify-center space-x-2">
                            <p className="flex items-center text-center">Manage this business</p>
                            <ArrowRight />
                        </div>
                    </Button>

                    <Button color="magenta" size="lg" className="w-full items-center justify-center self-start">
                        <div className="space-x-2 flex">
                            <p>Register new business</p>
                            <ArrowRight />
                        </div>
                    </Button>
                </div>

            </div>

            <div className="hidden sm:block">
                <div className="absolute right-0 mr-7">
                    <Button color="white" size="lg" className="rounded-lg border-2 border-gray-200 mr-7">
                        <div className="space-x-2 flex items-center">
                            <p>Manage this business</p>
                            <ArrowRight />
                        </div>
                    </Button>
                    <Button color="magenta" size="lg">
                        <div className="space-x-2 flex items-center">
                            <p>Register new business</p>
                            <ArrowRight />
                        </div>
                    </Button>
                </div>
            </div>

        </div>
  )
}

export default ProfileHeaderLayout