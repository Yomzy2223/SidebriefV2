"use client";

import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TServiceForm } from "@/services/service/types";
import { TProductForm } from "@/services/product/types";
import { Tabs, TabsRef } from "flowbite-react";
import { useParams, useSearchParams } from "next/navigation";
import { RefObject, useRef } from "react";
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
  const { deleteQueryString, setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeTab = parseInt(searchParams.get("activeTab") || "0");
  const setActiveTab = (active: number) => {
    setQueriesWithPath({ queries: [{ name: "activeTab", value: active?.toString() }] });
  };

  const isOnLastForm = forms.length - 1 === activeTab;

  // Navigate to the next form if not on the last form. Next page, if otherwise
  const handeNext = (i: number, subTabRef: RefObject<TabsRef>) => {
    if (isOnLastForm) {
      setQueriesWithPath({
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

  const openDocument = searchParams.get("openDocument") === "true";
  const setOpenDocument = (open: boolean) => {
    if (open) {
      setQueriesWithPath({
        queries: [{ name: "openDocument", value: open.toString() }],
      });
      return;
    }
    deleteQueryString("openDocument");
  };

  return (
    <DialogWrapper
      open={openDocument}
      setOpen={setOpenDocument}
      title="Required Documents"
      size="5xl"
      dismissible={false}
    >
      <div className="flex-1 flex flex-col gap-2 w-full">
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
                  <EachForm
                    info={el}
                    isLoading={false}
                    handeNext={(subTabRef) => handeNext(i, subTabRef)}
                    isOnLastForm={isOnLastForm}
                    isServiceForm
                  />
                </Tabs.Item>
              );
            })}
          </Tabs>
        ) : (
          <>
            <EachForm
              info={forms[0]}
              isLoading={false}
              handeNext={(subTabRef) => handeNext(0, subTabRef)}
              isOnLastForm={isOnLastForm}
              isServiceForm
            />
          </>
        )}
      </div>
    </DialogWrapper>
  );
};

export default RequestForm;
