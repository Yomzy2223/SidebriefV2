import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/flowbite";
import { BankIcon, CardIcon, CreditCardIcon } from "@/assets/svg";
import Transfer from './Transfer';
import { PaymentOption } from './PaymentOption';
import { CardPayment } from './CardPayment';
import { ArrowRight } from "@/assets/icons";

const tabs = [
  { name: 'Bank Transfer', href: '#', icon: BankIcon, current: true, content: <Transfer/> },
  { name: 'Card Payment', href: '#', icon: CardIcon, current: false, content: <PaymentOption/> },
  { name: 'Bank USSD', href:  '#',icon: CreditCardIcon, current: false, content: <CardPayment/> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


const Tab = () => {
  const [currentTab, setCurrentTab] = useState(tabs.find((tab) => tab.current));

  const handleTabChange = (selectedTab) => {
    setCurrentTab(selectedTab);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h6 className="text-2xl leading-normal font-semibold">
            Choose Payment Choice
          </h6>
          
          {/* Tabs selection  */}
          <div>
            <div className="sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => handleTabChange(tab)}
                    className={classNames(
                      tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    <div className="flex flex-col items-center p-4">
                        <Image src ={tab.icon} quality={100} alt=""/>
                        <h3 className="font-medium text-md leading-normal text-center mt-2">{tab.name} </h3>
                    </div>
                  </a>
                ))}
              </nav>
            </div>
            <div className="mt-2">{currentTab.content}</div>
          </div>
        </div> 
      </div>

      <Button color="magenta" size={"lg"} className="self-start mt-8">
        <div className="space-x-2 flex items-center">
            <p>Continue</p>
            <ArrowRight />
        </div>
      </Button>
    </div>
  );
};

export default Tab;

