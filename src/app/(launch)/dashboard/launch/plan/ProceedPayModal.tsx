import React, {useState} from 'react'
import {Button, Modal } from '@/components/flowbite'
import { ArrowRight } from "@/assets/icons";
import { X } from "lucide-react"

export const ProceedPayModal = ({
	open,
	close,
}: {
	open: boolean;
	close: () => void;
}) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <Modal show={open} onClose={close} position="bottom right">
            
           
            <div className='p-5 border'>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<h6 className="text-2xl leading-normal font-semibold text-primary">
							Before you proceed to payment
						</h6>
						<p className='py-4'>See other things you can do alongside side your business registration to save time. It may require additional documents and increase in payment</p>
					</div>
				</div>


                <div className="flex justify-between">
                    <div className="flex flex-row items-center">
                        <Button color="magenta" size={"lg"} className="self-start">
                        <div className="space-x-2 flex items-center">
                            <p>Continue</p>
                            <ArrowRight />
                        </div>
                        </Button>
                    </div>
                <div className="flex items-center">
                    <X className='w-7 h-7 rounded-full border text-red-600 border-gray-300 p-1 cursor-pointer'  />
                </div>
            </div>

			</div>
        </Modal>
    )
}
