"use client";

import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TServiceForm } from "@/services/service/types";
import { TProductForm } from "@/services/product/types";
import { Button, Tabs, TabsRef } from "flowbite-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import EachForm from "./eachForm";
import ConfirmAction from "@/components/confirmAction";

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
  const [openExit, setOpenExit] = useState(false);

  const tabsRef = useRef<TabsRef>(null);
  const { serviceId } = useParams();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();
  const businessId = searchParams.get("businessId") || "";

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
            queries: [
              { name: "openDocument", value: "true" },
              { name: "activeTab", value: "0" },
              { name: "activeSubTab", value: "0" },
            ],
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

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full">
      <div className="flex items-center justify-between gap-4 mb-1">
        <h4 className="text-sm leading-normal text-foreground-3">{step}</h4>
        <Button
          size="fit"
          color="transparent"
          className="text-primary"
          onClick={() => setOpenExit(true)}
        >
          Save and continue later
        </Button>
      </div>
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
                    <p className="font-medium leading-normal text-foreground-5">{el.description}</p>
                  </div>
                  <EachForm
                    info={el}
                    isLoading={false}
                    isServiceForm={isServiceForm}
                    handeNext={(subTabRef) => handeNext(i, subTabRef)}
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
            <p className="font-medium leading-normal text-foreground-5">{forms[0]?.description}</p>
          </div>
          <EachForm
            info={forms[0]}
            isLoading={false}
            handeNext={(subTabRef) => handeNext(0, subTabRef)}
            isServiceForm={isServiceForm}
          />
        </div>
      )}

      {openExit && (
        <ConfirmAction
          open={openExit}
          setOpen={setOpenExit}
          confirmAction={() => router.push(`/dashboard/?businessId=${businessId}`)}
          title="Save and exit"
          description="Are you sure you want to save and continue later"
          dismissible
        />
      )}
    </div>
  );
};

export default RequestForm;
