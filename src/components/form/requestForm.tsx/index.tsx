"use client";

import { TProductForm, TServiceForm } from "@/services/service/types";
import { Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import EachForm from "./eachForm";

const RequestForm = ({ forms }: { forms: (TServiceForm | TProductForm)[] }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 2</h4>
      {forms.length > 1 ? (
        <Tabs
          aria-label="Form tabs"
          style="underline"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          {forms.map((el, i, arr) => {
            return (
              <Tabs.Item active title={el.title} key={el.id}>
                <div className="space-y-5 w-full">
                  <div className="flex flex-col">
                    <h6 className="text-2xl leading-normal font-semibold">{el.title}</h6>
                    <p className="font-medium leading-normal text-primary">{el.description}</p>
                  </div>
                  <EachForm info={el} isLoading={false} isServiceForm />
                </div>
              </Tabs.Item>
            );
          })}
        </Tabs>
      ) : (
        <div className="space-y-5 w-full">
          <div className="flex flex-col">
            <h6 className="text-2xl leading-normal font-semibold">{forms[0]?.title}</h6>
            <p className="font-medium leading-normal text-primary">{forms[0]?.description}</p>
          </div>
          <EachForm info={forms[0]} isLoading={false} />
        </div>
      )}
    </div>
  );
};

export default RequestForm;
