"use client";

import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { Tabs, TabsRef } from "flowbite-react";
import { useParams, useSearchParams } from "next/navigation";
import { useRef } from "react";
import EachForm from "./eachForm";

const RequestForm = ({
  forms,
  isServiceForm,
  showOnlyDocs,
}: {
  forms: (TServiceForm | TProductForm)[];
  isServiceForm?: boolean;
  showOnlyDocs?: boolean;
}) => {
  const tabsRef = useRef<TabsRef>(null);
  const { serviceId } = useParams();

  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeTab = parseInt(searchParams.get("activeTab") || "0");
  const setActiveTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeTab", value: active.toString() }] });

  // Navigate to the next form if not on the last form. Next page, if otherwise
  const handeNext = (i?: number) => {
    const isOnLastForm = forms.length - 1 === activeTab;
    if (i === undefined || isOnLastForm) {
      const progress = isServiceForm ? "2" : "4";
      isServiceForm
        ? setQueriesWithPath({
            path: `/requests/${serviceId}/payment`,
            queries: [{ name: "progress", value: progress }],
          })
        : setQueriesWithPath({
            queries: [
              { name: "progress", value: progress },
              { name: "openDocument", value: "true" },
            ],
          });
      return;
    }
    tabsRef.current?.setActiveTab(i + 1);
  };

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
          {forms.map((el, i) => {
            return (
              <Tabs.Item key={el.id} active={i === activeTab} title={el.title}>
                <div className="space-y-5 w-full">
                  <div className="flex flex-col">
                    <h6 className="text-2xl leading-normal font-semibold">{el.title}</h6>
                    <p className="font-medium leading-normal text-primary">{el.description}</p>
                  </div>
                  <EachForm
                    info={el}
                    isLoading={false}
                    isServiceForm={isServiceForm}
                    onSubmit={() => handeNext(i)}
                  />
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
          <EachForm
            info={forms[0]}
            isLoading={false}
            onSubmit={handeNext}
            isServiceForm={isServiceForm}
          />
        </div>
      )}
    </div>
  );
};

export default RequestForm;
