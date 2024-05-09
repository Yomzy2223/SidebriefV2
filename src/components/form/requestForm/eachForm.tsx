"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { ArrowRightCircle } from "lucide-react";
import { useActions, useNewFormAction } from "./actions";
import { TServiceForm } from "@/services/service/types";
import { TProductForm } from "@/services/product/types";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import ConfirmAction from "@/components/confirmAction";
import { TFormQAGet } from "@/services/productQA/types";

const EachForm = ({
  info,
  isLoading,
  isServiceForm = false,
  handeNext,
}: {
  info: TServiceForm | TProductForm;
  isLoading: boolean;
  isServiceForm?: boolean;
  handeNext: (tabsRef: RefObject<TabsRef>) => void;
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

  const onFormDelete = (isNew?: boolean) => {
    let newActiveTab = isNew ? QAForms?.length - 1 : activeSubTab;
    if (activeSubTab === QAForms?.length - 1) newActiveTab = activeSubTab - 1;
    tabsRef.current?.setActiveTab(newActiveTab);
    setActiveSubTab(newActiveTab);
    isNew && setNewForm(false);
  };

  const addNewForm = () => {
    tabsRef.current?.setActiveTab(QAForms?.length);
    setActiveSubTab(QAForms?.length);
    setNewForm(true);
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
                  isServiceForm={isServiceForm}
                  setNewForm={setNewForm}
                  handeleSubmit={handeleSubmit}
                  addNewForm={addNewForm}
                  onFormDelete={onFormDelete}
                  formHasTabs
                />
              </Tabs.Item>
            );
          })}
          {newForm && (
            <Tabs.Item active={isOnLastSubTab} title={info.title + "" + (QAForms?.length + 1)}>
              <FormInstance
                info={info}
                isServiceForm={isServiceForm}
                setNewForm={setNewForm}
                handeleSubmit={handeleSubmit}
                onFormDelete={onFormDelete}
                formHasTabs
                isNewForm
              />
            </Tabs.Item>
          )}
        </Tabs>
      ) : (
        <FormInstance
          info={info}
          QAForm={QAForms?.[0]}
          isServiceForm={isServiceForm}
          setNewForm={setNewForm}
          handeleSubmit={handeleSubmit}
          formHasTabs={false}
          // isNewForm
        />
      )}
    </>
  );
};

export default EachForm;

const FormInstance = ({
  i,
  info,
  QAForm,
  formHasTabs,
  setNewForm,
  isServiceForm,
  isNewForm,
  handeleSubmit,
  addNewForm,
  onFormDelete,
}: IEachFormComp) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [onlyCreate, setOnlyCreate] = useState(false);

  const { deletePending, deleteQAForm, submitFormHandler, formInfo, isPending } = useNewFormAction({
    info,
    setOpenDelete,
    isServiceForm,
    QAForm,
    handeleSubmit,
    isNewForm,
    setNewForm,
    onFormDelete,
    onlyCreate,
    setOnlyCreate,
  });

  // console.log(formInfo);
  return (
    <DynamicForm
      formInfo={formInfo}
      onFormSubmit={({ values, reset }) => submitFormHandler(values)}
      className="gap-6"
      formClassName="gap-12 justify-between"
      fullFormInfo={info?.subForm}
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
                onClick={() =>
                  isNewForm ? onFormDelete && onFormDelete(true) : setOpenDelete(true)
                }
              >
                Delete
              </Button>
            )}
            <Button
              type={isNewForm || !formHasTabs ? "submit" : "button"}
              color="transparent"
              size="fit"
              className="text-primary lowercase"
              disabled={isPending}
              onClick={() => {
                !isNewForm && addNewForm && addNewForm();
                setOnlyCreate(true);
              }}
            >
              <span className="lowercase first-letter:uppercase">
                {isNewForm || !formHasTabs ? "Save" : `Add new ${info?.title || ""}`}
              </span>
            </Button>
          </div>
        )}
      </div>
      {openDelete && (
        <ConfirmAction
          open={openDelete}
          setOpen={setOpenDelete}
          confirmAction={deleteQAForm}
          title={`Delete ${info.title} ${(i || 0) + 1}`}
          description={`Are you sure you want delete this ${info?.title}'s information? He/She will be notified.`}
          isLoading={deletePending}
          dismissible
          isDelete
        />
      )}
    </DynamicForm>
  );
};

interface IEachFormComp {
  i?: number;
  info: TServiceForm | TProductForm;
  QAForm?: TFormQAGet;
  isServiceForm: boolean;
  formHasTabs: boolean;
  setNewForm: Dispatch<SetStateAction<boolean>>;
  isNewForm?: boolean;
  handeleSubmit: () => void;
  addNewForm?: () => void;
  onFormDelete?: (isNew?: boolean) => void;
}
