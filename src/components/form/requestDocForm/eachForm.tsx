"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions, useNewFormAction } from "./actions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import ConfirmAction from "@/components/confirmAction";
import { TFormQAGet } from "@/services/productQA/types";

const EachForm = ({
  info,
  isLoading,
  isServiceForm = false,
  handeNext,
  isOnLastForm,
}: {
  info: TServiceForm | TProductForm;
  isLoading: boolean;
  isServiceForm?: boolean;
  handeNext: (tabsRef: RefObject<TabsRef>) => void;
  isOnLastForm: boolean;
}) => {
  const [newForm, setNewForm] = useState<boolean>(false);

  const tabsRef = useRef<TabsRef>(null);
  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab and sub tab to url query
  const activeTab = parseInt(searchParams.get("activeTab") || "0");
  const activeSubTab = parseInt(searchParams.get("activeSubTab") || "0");
  const setActiveSubTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeSubTab", value: active.toString() }] });

  useEffect(() => {
    // Reset activeSubTab when activeTab changes
    tabsRef.current?.setActiveTab(0);
    setActiveSubTab(0);
  }, [activeTab]);

  const { QAForms, formHasTabs, isOnLastSubTab } = useActions({
    info,
    activeSubTab,
    newForm,
  });

  const handeleSubmit = () => {
    if (isOnLastSubTab) {
      handeNext(tabsRef);
      return;
    }
    tabsRef.current?.setActiveTab(activeSubTab + 1); //navigate to the next sub tab
    setActiveSubTab(activeSubTab + 1);
  };

  return (
    <>
      {formHasTabs ? (
        <Tabs
          id="subFormTabs"
          aria-label="Form tabs"
          style="pills"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveSubTab(tab)}
        >
          {QAForms.map((el, i) => {
            const title = el.title + " " + (i + 1);
            return (
              <Tabs.Item
                key={el.id}
                id={"subFormTabs" + i}
                active={i === activeSubTab}
                title={title}
              >
                <FormInstance
                  i={i}
                  info={info}
                  QAForm={el}
                  handeleSubmit={handeleSubmit}
                  isOnLastSubTab={isOnLastSubTab}
                  formHasTabs
                />
              </Tabs.Item>
            );
          })}
        </Tabs>
      ) : (
        <FormInstance
          info={info}
          QAForm={QAForms?.[0]}
          handeleSubmit={handeleSubmit}
          isOnLastSubTab={isOnLastSubTab}
          formHasTabs={false}
        />
      )}
    </>
  );
};

export default EachForm;

const FormInstance = ({
  info,
  QAForm,
  handeleSubmit,
  formHasTabs,
  isOnLastSubTab,
}: IEachFormComp) => {
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeSubTab = parseInt(searchParams.get("activeSubTab") || "0");
  const setActiveSubTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeSubTab", value: active.toString() }] });

  const { submitFormHandler, formInfo, isPending } = useNewFormAction({
    info,
    QAForm,
    handeleSubmit,
    setIsUploading,
  });

  let btnText = isOnLastSubTab ? "Continue" : "Next";

  return (
    <DynamicForm
      formInfo={formInfo}
      onFormSubmit={({ values, reset }) => submitFormHandler(values)}
      className="flex flex-col sm:grid sm:grid-cols-2 gap-5"
      formClassName="gap-12 justify-between max-w-full my-4"
    >
      <div className="flex justify-between gap-6">
        <Button color="secondary" outline size="lg" type="button" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          color="secondary"
          size="lg"
          type="submit"
          isProcessing={isPending || isUploading}
          disabled={isPending || isUploading}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          {btnText}
        </Button>
      </div>
    </DynamicForm>
  );
};

interface IEachFormComp {
  i?: number;
  info: TServiceForm | TProductForm;
  QAForm?: TFormQAGet;
  formHasTabs: boolean;
  handeleSubmit: () => void;
  isOnLastSubTab?: boolean;
}
