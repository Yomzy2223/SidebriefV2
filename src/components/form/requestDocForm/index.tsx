import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { Tabs, TabsRef } from "flowbite-react";
import { useParams, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import EachForm from "./eachForm";

const RequestDocForm = ({ forms }: { forms: (TServiceForm | TProductForm)[] }) => {
  const tabsRef = useRef<TabsRef>(null);
  const { serviceId } = useParams();

  const searchParams = useSearchParams();
  const { deleteQueryString, setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeTab = parseInt(searchParams.get("activeTab") || "0");
  const setActiveTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeTab", value: active.toString() }] });

  // Navigate to the next form if not on the last form. Next page, if otherwise
  const isOnLastForm = forms.length - 1 === activeTab;
  const handeNext = (i?: number) => {
    if (i === undefined || isOnLastForm) {
      setQueriesWithPath({
        path: `/requests/${serviceId}/review`,
        queries: [{ name: "progress", value: "4" }],
      });
      return;
    }
    tabsRef.current?.setActiveTab(i + 1);
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

  const resetDialog = () => {
    setOpenDocument(false);
  };

  return (
    <DialogWrapper
      open={openDocument}
      setOpen={setOpenDocument}
      title="Required Documents"
      size="3xl"
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
                    onSubmit={() => handeNext(i)}
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
              onSubmit={handeNext}
              isOnLastForm={isOnLastForm}
              isServiceForm
            />
          </>
        )}
      </div>
    </DialogWrapper>
  );
};

export default RequestDocForm;
