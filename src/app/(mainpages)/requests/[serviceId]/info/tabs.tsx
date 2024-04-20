"use client";

import { RequestForm } from "@/components/form/requestForm.tsx";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";

export const ProductTabsWithForm = ({ formInfo }: { formInfo: TServiceForm[] }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs
      aria-label="Form tabs"
      style="underline"
      ref={tabsRef}
      onActiveTabChange={(tab) => setActiveTab(tab)}
    >
      {formInfo.map((el, i, arr) => {
        return (
          <Tabs.Item active title={el.title} key={el.id}>
            <div className="space-y-5 w-full">
              <div className="flex flex-col">
                <h6 className="text-2xl leading-normal font-semibold">{el.title}</h6>
                <p className="font-medium leading-normal text-primary">{el.description}</p>
              </div>
              <RequestForm info={el} isLoading={false} isServiceForm />
            </div>
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
};
