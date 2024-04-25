"use client";

import { Modal } from "@/components/flowbite";
import { useGetRequestQA } from "@/services/productQA";
import { IForm } from "@/services/productQA/types";
import { useState } from "react";
import { useUploadActions } from "./uploadActions";
import { UploadForm } from "./uploadform";
import { isFileType, useRemember } from "../../../info/[processId]/actions";

export const KycUploadModal = ({
  open,
  closer,
  productId,
  forms,
}: {
  open: boolean;
  closer: () => void;
  productId: string;
  forms: IForm[];
}) => {
  const [selected, setSelected] = useState(1);

  const productQA = useGetRequestQA(productId);

  const allQA = productQA.data?.data.data;

  const persons = allQA?.filter((qa) => qa.type === "person");

  const { withDocument, getForm } = useUploadActions({ persons: persons || [], forms });

  if (persons === undefined || persons.length <= 0) {
    // go to the next page
    closer();
  }

  const { values, isLoading, formState, refetchState } = useRemember({
    productId: productId,
    form: {
      ...getForm(selected),
      title: "document upload",
      description: withDocument()[selected - 1].title,
    },
    selectedPerson: 1,
  });

  return (
    <Modal show={open} onClose={closer} size={"4xl"} className="">
      <Modal.Header>Required documents</Modal.Header>
      {Array.isArray(withDocument()) &&
        withDocument().map(
          (_, index) =>
            index + 1 === selected && (
              <UploadForm
                key={index}
                productId={productId}
                forms={forms}
                closer={closer}
                selected={selected}
                setSelected={(num) => setSelected(num)}
                values={values}
                formState={formState}
                refetch={async () => {
                  await refetchState();
                }}
              />
            )
        )}
    </Modal>
  );
};
