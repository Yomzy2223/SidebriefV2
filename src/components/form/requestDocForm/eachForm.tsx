"use client";

import { Button, Label, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { Oval } from "react-loading-icons";
import { TProductForm, TServiceForm } from "@/services/service/types";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useActions } from "./actions";
import { FileInput } from "@/components/file/fileInput";

const EachForm = ({
  info,
  isLoading,
  isServiceForm = false,
  isOnLastForm,
  onSubmit,
}: {
  info: TServiceForm | TProductForm;
  isLoading: boolean;
  isServiceForm?: boolean;
  onSubmit: () => void;
  isOnLastForm: boolean;
  showOnlyDocs?: boolean;
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const tabsRef = useRef<TabsRef>(null);
  const searchParams = useSearchParams();
  const { setQueriesWithPath } = useGlobalFunctions();

  // Get and set active tab to url query
  const activeSubTab = parseInt(searchParams.get("activeSubTab") || "0");
  const setActiveSubTab = (active: number) =>
    setQueriesWithPath({ queries: [{ name: "activeSubTab", value: active.toString() }] });

  const { formInfo, submitFormHandler, isPending, QAForms, docSubforms, docTemplateSubforms } =
    useActions({
      info,
      isServiceForm,
      onSubmit,
      activeSubTab,
      setActiveSubTab,
      tabsRef,
      setIsUploading,
    });

  const isOnLastSubForm = QAForms?.length - 1 === activeSubTab;
  let btnText = `Go to next ${info?.title}`;
  if (isOnLastSubForm) btnText = "Continue";

  return (
    <div className="flex flex-col gap-16">
      {docTemplateSubforms?.length > 0 && (
        <div>
          <div className="mb-6">
            <p className="sb-text-18 font-semibold">Document Templates</p>
            <p className="text-sm text-foreground-9">
              Download and fill these documents as appropriate, then upload below
            </p>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
            {docTemplateSubforms?.map((el) => (
              <div key={el.id}>
                <Label value={el.documentType} className="mb-2" />
                <FileInput
                  onFileChange={(file) => console.log(file)}
                  fileName={el.fileName || ""}
                  fileLink={el.fileLink || ""}
                  fileType={el.fileType || ""}
                  fileSize={el.fileSize || ""}
                  onlyDownload
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="sb-text-18 font-semibold mb-3">Upload {info?.title}s documents</p>
        <div className="">
          {QAForms?.length > 1 && (
            <Tabs
              id="subFormTabs"
              aria-label="Form tabs"
              style="pills"
              ref={tabsRef}
              onActiveTabChange={(tab) => setActiveSubTab(tab)}
              className="flex flex-row flex-nowrap overflow-auto whitespace-nowrap mb-6"
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
            </Tabs>
          )}
          <DynamicForm
            formInfo={formInfo}
            onFormSubmit={({ values }) => submitFormHandler(values)}
            className="flex flex-col sm:grid sm:grid-cols-2 gap-5"
            formClassName="gap-12 justify-between max-w-full my-4"
          >
            <div className="flex justify-between gap-6">
              <Button
                color="secondary"
                outline
                size="lg"
                type="button"
                disabled={isPending || isUploading}
                onClick={() => router.back()}
              >
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
        </div>
      </div>
    </div>
  );
};

export default EachForm;
