"use client";

import { Tabs, TabsRef } from "flowbite-react";
import { LaunchForm1 } from "./form";
import { serviceFormType } from "@/services/service/types";
import { useRef, useState } from "react";

export const ProductTabs = ({
  allServiceForms,
  productId,
}: {
  allServiceForms: serviceFormType[];
  productId: string;
}) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs
      aria-label="Form tabs"
      style="underline"
      ref={tabsRef}
      onActiveTabChange={(tab) => setActiveTab(tab)}
    >
      {allServiceForms.map((el, i, arr) => (
        <Tabs.Item active title={el.title} key={el.id}>
          <div className="space-y-5 w-full">
            <div className="flex flex-col">
              <h6 className="text-2xl leading-normal font-semibold">{el.title}</h6>
              <p className="font-medium leading-normal text-primary">{el.description}</p>
            </div>
            <LaunchForm1
              urlProductId={productId}
              form={el}
              tabsRef={tabsRef}
              currentTab={i}
              totalNumOfTabs={arr.length}
            />
          </div>
        </Tabs.Item>
      ))}
    </Tabs>
  );
};
