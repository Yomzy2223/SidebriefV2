"use client"
import React, {useState} from 'react'
import { Modal, Button } from "@/components/flowbite";
import Image from 'next/image';
import { Rocket } from "@/assets/images";
import { ArrowRight } from "@/assets/icons";
import { StaticImageData } from 'next/image';
import { X } from "lucide-react"

interface ServiceProps {
    name: string;
    amount:number;
    documents: Object;
    description: string;    
    icon:StaticImageData;
}

const OtherServices: ServiceProps[] = [
	{
	  name: 'Tax',
      amount: 1200,
      documents: "Statement of account",
	  description:
		'Add tax to registering your business without the need for any physical paperwork.',
	  icon: Rocket,
	},
	{
        name: 'Bank Account',
        amount: 1200,
        documents: "Statement of account",
        description:
          'Add tax to registering your business without the need for any physical paperwork.',
        icon: Rocket,
      },
      {
        name: 'Work Permit',
        amount: 1200,
        documents: "Statement of account",
        description:
          'Add tax to registering your business without the need for any physical paperwork.',
        icon: Rocket,
      }
]
export const ServicesModal = ({
    open, 
    close
    }:{
      open:boolean; 
      close: () => void,
    }) => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [totalFee, setTotalFee] = useState(0)

    const handleServiceAdd = (serviceName: string) => {
      const selectedService = OtherServices.find((service) => service.name === serviceName);
    
      if (selectedService && !selectedServices.includes(serviceName)) {
        setSelectedServices((prevServices) => [...prevServices, serviceName]);
        setTotalFee((prevFee) => prevFee + selectedService.amount);
      }
    };
    const handleRemoveService = (serviceName: string) => {
      const removedService = OtherServices.find((service) => service.name === serviceName);
    
      if (removedService) {
        setSelectedServices((prevServices) =>
          prevServices.filter((name) => name !== serviceName)
        );
        setTotalFee((prevFee) => prevFee - removedService.amount);
      }
    };
    return (
        <Modal show={open} onClose={close} size={"7xl"} >
            <Modal.Header>Other services you can get alongside your business registration</Modal.Header>
            <Modal.Body>
                <p className='font-bold mb-4'>Total Fee: {`#${totalFee}`}</p>
                <div className="-mb-10">
                  {selectedServices.map((service, index) => (
                    <div key={index} className="bg-[#00A2D4] text-white px-7 py-2 mr-4 rounded-md inline-flex items-center">
                        {service} 
                        <Button color='primary' onClick={() => handleRemoveService(service)}>
                          <X className="w-5 h-5 ml-2" />
                        </Button>
                   </div>
                  ))}
                </div>
                <div className="max-w-12xl">
                  <ul role="list"
                    className="mx-auto mt-16 grid grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
                    >
                      {OtherServices.map((service) => (
                        <li key={service.name} className="rounded-2xl border border-gray-200 p-8" onClick={() => handleServiceAdd(service.name)}>
                        <div className="flex items-center justify-between">
                          <div className="flex justify-between items-center py-4">
                            <Image src={service.icon} alt="" className="h-8 w-8"/>
                            <h3 className="ml-4 font-semibold text-gray-900">
                              {service.name}
                            </h3>
                          </div>
                          <h4 className="text-primary">{`#${service.amount}`}</h4>
                        </div>
                        <p className="mt-2 text-gray-700">{service.description}</p>

                        <div className='mt-5'>
                          <h2 className='font-300'>Documents Required</h2>
                      </div>
                        </li>
                        
                      ))}
                  </ul>

                </div>
                <div className="flex justify-between mt-8">
                  <Button onClick={close} color="magenta" className='px-12 py-3'>
                    <span className='mx-3'>
                    Pay Now
                    </span>
                    <ArrowRight/>
                  </Button>
              </div>
            </Modal.Body>
        </Modal>
    )
}
