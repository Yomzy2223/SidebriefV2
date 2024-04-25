"use client";

import { Button, Tabs, TabsRef } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";
import { IForm, ISubForm } from "@/services/productQA/types";
import { cn, sluggify } from "@/lib/utils";
import { ArrowRight } from "@/assets/icons";
import { useRef, useState } from "react";
import { useActions, useRemember, isFileType } from "../../info/[processId]/actions";
import { Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { X, Loader } from "lucide-react";
import { LoadingSkeleton } from "@/components/input";
import { KycUploadModal } from "./upload/kycUploadModal";
import { UseFormReset } from "react-hook-form";

export const Forms = ({ forms, productId }: { forms: IForm[]; productId: string }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [addPerson, setAddPerson] = useState(false);
  // selected person default value has to be one
  const [selectedPerson, setSelectedPerson] = useState<number | null>(1);
  const [deletedPerson, setDeletedPerson] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reset, setReset] = useState<UseFormReset<any>>();

  const {
    saveFormProductQA,
    savingForm,
    updateFormProductQA,
    updatingForm,
    deleteFormProductQA,
    deletingForm,
  } = useActions({
    form: forms[activeTab],
  });

  const { values, isLoading, formState, refetchState } = useRemember({
    productId: productId,
    form: forms[activeTab],
    selectedPerson,
  });

  const getResetForm = (reset: UseFormReset<any>) => {
    if (reset) {
      setReset(() => reset);
    }
  };

  const submitform = async (values: { [key: string]: string | string[] }) => {
    setSaving(true);
    const saveOrUpdate = async () => {
      if (!formState || !selectedPerson) {
        await saveFormProductQA({
          productId: productId,
          values,
          isGeneral: true,
        });
      } else {
        await updateFormProductQA({
          requestFormState: !Array.isArray(formState) ? formState : formState[selectedPerson - 1],
          values: values,
          isGeneral: true,
        });
      }

      await refetchState();
    };

    if (!addPerson) {
      await saveOrUpdate();

      if (tabsRef && activeTab !== forms.length - 1) {
        tabsRef.current?.setActiveTab(activeTab + 1);
      } else {
        // open the upload modal
        setOpenModal(true);
      }
    }

    if (addPerson) {
      await saveOrUpdate();
      setSelectedPerson(null);
      reset && reset();
    }
    setSaving(false);
  };

  const justOpenModal = () => {
    if (selectedPerson === null) {
      setOpenModal(true);
    }
  };

  const deleteQA = async (personNumber: number) => {
    if (!formState) return;

    setDeletedPerson(personNumber);

    console.log("deleting...", personNumber + 1);

    // console.log(!Array.isArray(formState) ? formState : formState[personNumber]);

    await deleteFormProductQA({
      requestFormState: !Array.isArray(formState) ? formState : formState[personNumber],
    });

    console.log("refetching...");

    await refetchState();
  };

  const noDocuments: (form: IForm) => ISubForm[] = (form: IForm) => {
    return form.productSubForm.filter(
      (subform) => subform.type !== "document upload" && subform.type !== "document template"
    );
  };

  return (
    <>
      <Tabs
        aria-label="Form tabs"
        style="underline"
        ref={tabsRef}
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        {forms.map((form) => {
          const isPerson = form.type === "person";

          return (
            <Tabs.Item active title={form.title} key={form.id}>
              <div className="space-y-5 w-full">
                <div className="flex flex-col">
                  {/* <h6 className="text-2xl leading-normal font-semibold">{form.title}</h6> */}
                  <p className="font-medium leading-normal text-primary">{form.description}</p>
                </div>
                {formState && isPerson && (
                  <div className="flex gap-2.5 flex-wrap">
                    {Array.isArray(formState) &&
                      formState.map((form, index) => (
                        // the persons
                        <Badge
                          key={form.id}
                          color={index + 1 === selectedPerson ? "yellow" : "green"}
                          icon={SwatchBook}
                          onClick={() => setSelectedPerson(index + 1)}
                          className={cn("cursor-pointer", {
                            "opacity-50": index + 1 !== selectedPerson,
                          })}
                        >
                          <div className="flex gap-0.5 items-center">
                            {form.subForm[0]?.answer[0]}
                            {deletingForm && deletedPerson === index ? (
                              <Loader className="h-3 animate-spin" />
                            ) : (
                              <X
                                className="h-3 cursor-pointer"
                                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                                  e.stopPropagation();
                                  deleteQA(index);
                                }}
                              />
                            )}
                          </div>
                        </Badge>
                      ))}
                    {/* <Badge
                      color={selectedPerson === null ? "yellow" : "green"}
                      icon={SwatchBook}
                      onClick={() => setSelectedPerson(null)}
                      className={cn("cursor-pointer", {
                        "opacity-50": null !== selectedPerson,
                      })}
                    >
                      <div className="flex gap-0.5 items-center">null</div>
                    </Badge> */}
                  </div>
                )}
                {noDocuments(form).length <= 0 ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitform({});
                    }}
                    className="space-y-8"
                  >
                    <p>Proceed to the next tab</p>
                    <Button
                      color="secondary"
                      size={"lg"}
                      type="submit"
                      // isProcessing={savingForm}
                      // disabled={isLoading}
                    >
                      <div className="space-x-2 flex items-center">
                        <p>Continue</p>
                        <ArrowRight />
                      </div>
                    </Button>
                  </form>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="space-y-10">
                        {[1, 2, 3]?.map((number) => (
                          <LoadingSkeleton key={number} />
                        ))}
                      </div>
                    ) : (
                      <DynamicForm
                        formInfo={noDocuments(form).map((subform) => {
                          const value = values[sluggify(subform.question)];
                          const rValue = !isFileType(value) ? value : "";
                          return {
                            name: sluggify(subform.question),
                            type: subform.type,
                            id: subform.id,
                            label: subform.question,
                            selectOptions: subform.options,
                            value: rValue,
                          };
                        })}
                        onFormSubmit={submitform}
                        resetForm={getResetForm}
                        // selectedPerson={selectedPerson}
                      >
                        <div className="flex justify-between">
                          <div className="flex space-x-[18px]">
                            <Button
                              color="secondary"
                              size={"lg"}
                              type={selectedPerson === null ? "button" : "submit"}
                              isProcessing={saving}
                              disabled={isLoading}
                              onClick={() => {
                                setAddPerson(false);
                                if (selectedPerson === null) {
                                  justOpenModal();
                                }
                              }}
                            >
                              <div className="space-x-2 flex items-center">
                                <p>Continue</p>
                                <ArrowRight />
                              </div>
                            </Button>
                            {/* <Button
                      color="primary"
                      size={"lg"}
                      type="button"
                      outline
                      // isProcessing={savingForm}
                      // disabled={isLoading}
                    >
                      <div className="space-x-2 flex items-center">
                        <p className="text-primary">Upload documents</p>
                      </div>
                    </Button> */}
                          </div>
                          {isPerson && (
                            <Button
                              color="ghost2"
                              size={"lg"}
                              type="submit"
                              // isProcessing={savingForm}
                              disabled={isLoading}
                              onClick={() => setAddPerson(true)}
                            >
                              <div className="space-x-2 flex items-center">
                                <p className="text-primary">Add new {form.title.toLowerCase()}</p>
                              </div>
                            </Button>
                          )}
                        </div>
                      </DynamicForm>
                    )}
                  </>
                )}
              </div>
            </Tabs.Item>
          );
        })}
      </Tabs>
      <KycUploadModal
        open={openModal}
        closer={() => {
          setOpenModal(false);
        }}
        productId={productId}
        forms={forms}
      />
    </>
  );
};