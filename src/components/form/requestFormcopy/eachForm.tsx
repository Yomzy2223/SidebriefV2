"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle, X } from "lucide-react";
import { useActions } from "./actions";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import ConfirmAction from "@/components/confirmAction";

const EachForm = ({
  info,
  isLoading,
  isServiceForm = false,
  onSubmit,
}: {
  info: TServiceForm | TProductForm;
  isLoading: boolean;
  isServiceForm?: boolean;
  onSubmit: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [onlyCreate, setOnlyCreate] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [newFormInfo, setNewFormInfo] = useState({});

  const tabsRef = useRef<TabsRef>(null);
  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeSubTab = parseInt(searchParams.get("activeSubTab") || "0");
  const setActiveSubTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeSubTab", value: active.toString() }] });

  const {
    formInfo,
    submitFormHandler,
    isPending,
    QAForms,
    deleteQAForm,
    deletePending,
    formHasTabs,
    isOnLastSubTab,
  } = useActions({
    info,
    isServiceForm,
    setOnlyCreate,
    onSubmit,
    activeSubTab,
    setActiveSubTab,
    tabsRef,
    newForm,
    newFormInfo,
    setNewForm,
    setOpenDelete,
  });

  const addNewForm = () => {
    if (isOnLastSubTab) {
      console.log("Submit form");
      setOnlyCreate(true);
      return;
    }
    console.log("Go to the next form");
    tabsRef.current?.setActiveTab(QAForms?.length);
    setActiveSubTab(QAForms?.length);
    setNewForm(true);
    // document.getElementById("subFormTabs" + activeSubTab)?.scrollIntoView({ behavior: "smooth" });
    return;
  };

  const removeLastForm = () => {
    tabsRef.current?.setActiveTab(QAForms?.length - 1);
    setActiveSubTab(QAForms?.length - 1);
    setNewForm(false);
  };

  // info.title === "Title" && console.log(formInfo);
  return (
    <>
      {formHasTabs && (
        <Tabs
          id="subFormTabs"
          aria-label="Form tabs"
          style="pills"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveSubTab(tab)}
          className="flex flex-row flex-nowrap overflow-auto whitespace-nowrap"
        >
          {QAForms.map((el, i) => {
            const title = el.title + " " + (i + 1);
            return (
              <Tabs.Item
                key={el.id}
                id={"subFormTabs" + i}
                active={i === activeSubTab}
                title={title}
              />
            );
          })}
          {newForm && (
            <Tabs.Item active={isOnLastSubTab} title={info.title + "" + (QAForms?.length + 1)} />
          )}
        </Tabs>
      )}
      <DynamicForm
        formInfo={formInfo}
        onFormSubmit={({ values, reset }) => submitFormHandler(values, reset, onlyCreate)}
        className="gap-6"
        formClassName="gap-12 justify-between"
      >
        <div className="flex justify-between gap-6">
          <Button
            color="secondary"
            size="lg"
            type="submit"
            isProcessing={isPending && !onlyCreate}
            disabled={isPending}
            processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
          >
            <div className="space-x-2 flex items-center">
              <p>Continue</p>
              {!isPending && <ArrowRightCircle className="ml-1" />}
            </div>
          </Button>
          {info?.type === "person" && (
            <div className="flex gap-6 items-center">
              {formHasTabs && (
                <Button
                  type="button"
                  color="transparent"
                  size="fit"
                  className="text-destructive-foreground"
                  disabled={deletePending || isPending}
                  onClick={() => (isOnLastSubTab ? removeLastForm() : setOpenDelete(true))}
                >
                  Delete
                </Button>
              )}
              <Button
                type={formHasTabs ? (isOnLastSubTab ? "submit" : "button") : "submit"}
                // type="button"
                color="transparent"
                size="fit"
                className="text-primary lowercase"
                disabled={isPending}
                onClick={addNewForm}
              >
                <span className="lowercase first-letter:uppercase">
                  {newForm && isOnLastSubTab ? "Save" : `Add new ${info?.title || ""}`}
                </span>
              </Button>
            </div>
          )}
        </div>
      </DynamicForm>
      {openDelete && (
        <ConfirmAction
          open={openDelete}
          setOpen={setOpenDelete}
          confirmAction={deleteQAForm}
          title={`Delete ${info.title} ${activeSubTab + 1}`}
          description={`Are you sure you want delete this ${info?.title}'s information? He/She will be notified.`}
          isLoading={deletePending}
          dismissible
          isDelete
        />
      )}
    </>
  );
};

export default EachForm;
