"use client"
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Sidebrief from "@/assets/images/sidebrief-logo.png";
import Line from "@/assets/line.png"
import FileCheck from "@/assets/svg/file-check.svg"
import ClipBoard  from '@/assets/svg/clipboard.svg'
import  BusinesReg from "@/assets/svg/thumbs-up.svg"
import { cn } from "@/lib/utiils";
import { 
    Button,
    Sidebar 
} from "@/components/flowbite"
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

// function classNames(...classes:any[]) {
//   return classes.filter(Boolean).join(' ')
// }

const stepNavLinks = [
    { name: 'Business Info', href: '/', icon: HiArrowSmRight,  current: true },
    { name: 'Registration Plans', href: '/', icon: HiChartPie, current: false },
    { name: 'Payment', href: '/', icon: HiInbox,  current: false },
    { name: 'KYC', href: '/', icon: HiUser,  current: false }
]
const StepNavigation = () => {
  return (
    <>
        <Sidebar >
        {stepNavLinks.map((link, index) => (
            <div className='mt-5' key={link.name}>
                <Link
                    href={link.href}
                    className={cn(
                        link.current ? 'bg-gray-50 text-[#00A2D4]'
                        : 'text-gray-700 hover:text-[#00A2D4] hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                >
                    <div className="flex items-center gap-2 ">
                        <div className={cn(
                            "flex items-center justify-center w-7 h-7 rounded-full border-0 border-gray-500 bg-gray-200",
                            index < stepNavLinks.length - 1 && 'border-r'
                        )}>
                            <link.icon/>
                        </div>
                        
                        <span className={cn(
                            "text-gray-500"
                            )}
                        >
                            <div  className={cn(
                                link.current ? 'bg-gray-50 text-[#00A2D4]'
                                : 'text-gray-700 hover:text-[#00A2D4] hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}>
                                {link.name}
                            </div>
                            
                        </span>
                    </div>
                </Link>
                {index < stepNavLinks.length - 1 && (
                    <div className="border-gray-100 ml-5">
                        <Image src={Line} alt={"Line"} quality={100} className='h-6'/>
                    </div>
                )}
            </div>
            
        ))}
        </Sidebar>
    </>
    

  )
}

export default StepNavigation