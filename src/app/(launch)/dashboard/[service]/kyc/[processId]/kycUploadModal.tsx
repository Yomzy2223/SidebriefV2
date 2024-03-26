"use client";

import { Modal, Button, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink, Filter, X } from "lucide-react";
import { FileInput } from "@/components/form/fileInput";
import { useGetProductQA } from "@/services/product";
import { productFormType } from "@/services/product/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

export const KycUploadModal = ({
  open,
  closer,
  productId,
  forms,
}: {
  open: boolean;
  closer: () => void;
  productId: string;
  forms: productFormType[];
}) => {
  const params: { service: string; processId: string } = useParams();
  const router = useRouter();

  const [selected, setSelected] = useState(1);

  const productQA = useGetProductQA(productId);

  const allQA = productQA.data?.data.data;

  // only supports person file uploads for now

  const persons = allQA?.filter((qa) => qa.type === "person");

  if (persons === undefined || persons.length <= 0) {
    // go to the next page
    closer();
  }

  const completeDone = () => {
    router.push(`/dashboard/${params.service}/review`);
    closer();
  };

  return (
    <Modal show={open} onClose={closer} size={"4xl"} className="">
      <Modal.Header>Required documents</Modal.Header>
      <form className="overflow-y-auto">
        <Modal.Body className="py-11 px-5 space-y-8">
          {persons && (
            <div className="flex gap-2.5 flex-wrap">
              {Array.isArray(persons) &&
                persons.map((form, index) => (
                  // the persons
                  <Badge
                    key={form.id}
                    color={index + 1 === selected ? "yellow" : "green"}
                    icon={SwatchBook}
                    onClick={() => setSelected(index + 1)}
                    className={cn("cursor-pointer", {
                      "opacity-50": index + 1 !== selected,
                    })}
                  >
                    <div className="flex gap-0.5 items-center">
                      {form.subForm[0].answer[0]}
                      {/* <X className="h-3 cursor-pointer" /> */}
                    </div>
                  </Badge>
                ))}
            </div>
          )}
          <div className="space-y-6">
            <div className="flex justify-between">
              <h4 className="text-2xl font-semibold text-gray-900 leading-normal">
                Upload {persons?.at(selected - 1)?.subForm[0].answer[0]}’s Document
              </h4>
              <Button color="link" size={"fit"}>
                <div className="flex gap-2 items-center">
                  See details <ExternalLink size={16} />
                </div>
              </Button>
            </div>
            {productQA.isLoading ? (
              <>Loading...</>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {forms
                  .filter((form) => form.title === persons?.at(selected - 1)?.title)[0]
                  ?.productSubForm.filter((sub) => sub.type === "document upload")
                  .map((sub) => {
                    return <FileInput key={sub.id} name={sub.question} />;
                  }) || <p>No matching form found.</p>}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={completeDone} color="secondary">
            Done
          </Button>
          <Button color="gray" onClick={closer}>
            Go to next proprietor
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
