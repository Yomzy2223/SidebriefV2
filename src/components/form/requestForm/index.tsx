"use client";

import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { Tabs, TabsRef } from "flowbite-react";
import { useParams, useSearchParams } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";
import EachForm from "./eachForm";

const RequestForm = ({
  forms,
  isServiceForm,
  showOnlyDocs,
  step,
}: {
  forms: (TServiceForm | TProductForm)[];
  isServiceForm?: boolean;
  showOnlyDocs?: boolean;
  step: string;
}) => {
  const tabsRef = useRef<TabsRef>(null);
  const { serviceId } = useParams();

  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeTab = parseInt(searchParams.get("activeTab") || "0");
  const setActiveTab = (active: number) => {
    setQueriesWithPath({ queries: [{ name: "activeTab", value: active?.toString() }] });
  };

  // Navigate to the next form if not on the last form. Next page, if otherwise
  const isOnLastForm = forms.length - 1 === activeTab;
  const requiresFiles = forms?.some((el) =>
    el.subForm?.some((el) => el.type === "document template" || el.type === "document upload")
  );

  const handeNext = (i: number, subTabRef: RefObject<TabsRef>) => {
    if (isOnLastForm) {
      if (isServiceForm) {
        setQueriesWithPath({
          path: `/requests/${serviceId}/payment`,
          queries: [{ name: "progress", value: "2" }],
        });
        return;
      }
      requiresFiles
        ? setQueriesWithPath({
            queries: [{ name: "openDocument", value: "true" }],
          })
        : setQueriesWithPath({
            path: `/requests/${serviceId}/review`,
            queries: [{ name: "progress", value: "4" }],
          });
      return;
    }
    tabsRef.current?.setActiveTab(i + 1); // Navigate to the next tab
    subTabRef.current?.setActiveTab(0); // Reset subTab
    setQueriesWithPath({
      queries: [
        { name: "activeTab", value: (i + 1)?.toString() },
        { name: "activeSubTab", value: "0" }, // Reset activeSubTab
      ],
    });
  };

  // console.log(forms);
  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">{step}</h4>
      {forms.length > 1 ? (
        <Tabs
          aria-label="Form tabs"
          style="underline"
          ref={tabsRef}
          onActiveTabChange={(tabs) => setActiveTab(tabs)}
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
                    handeNext={(subTabRef) => handeNext(i, subTabRef)}
                    isOnLastForm={isOnLastForm}
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
            handeNext={(subTabRef) => handeNext(0, subTabRef)}
            isServiceForm={isServiceForm}
            isOnLastForm
          />
        </div>
      )}
    </div>
  );
};

export default RequestForm;
