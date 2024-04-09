"use client";

import { Modal } from "@/components/flowbite";
import { useGetProductQA } from "@/services/product";
import { productFormType } from "@/services/product/types";
import { useState } from "react";
import { useUploadActions } from "./uploadActions";
import { UploadForm } from "./uploadform";
import { useRemember } from "../../../info/[processId]/actions";

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
  const [selected, setSelected] = useState(1);

  const productQA = useGetProductQA(productId);

  const allQA = productQA.data?.data.data;

  const persons = allQA?.filter((qa) => qa.type === "person");

  const { withDocument } = useUploadActions({ persons: persons || [] });

  if (persons === undefined || persons.length <= 0) {
    // go to the next page
    closer();
  }

  const { getForm } = useUploadActions({ persons: persons || [] });

  const getSelectedPerson: () => number | null | undefined = () => {
    const formWithDocuments = withDocument(forms);
    const form = getForm(forms, selected);

    if (form.type !== "person") {
      return 1;
    } else {
      const selectedNumber = formWithDocuments
        .filter((el) => el.personType === form.title)
        .findIndex((el) => el.title === formWithDocuments[selected - 1].title);

      return selectedNumber + 1;
    }
  };

  const { values, isLoading, formState, refetchState } = useRemember({
    productId: productId,
    form: getForm(forms, selected),
    selectedPerson: getSelectedPerson(),
  });

  return (
    <Modal show={open} onClose={closer} size={"4xl"} className="">
      <Modal.Header>Required documents</Modal.Header>
      {Array.isArray(withDocument(forms)) &&
        withDocument(forms).map(
          (_, index) =>
            index + 1 === selected && (
              <UploadForm
                key={index}
                productId={productId}
                forms={forms}
                closer={closer}
                selected={selected}
                setSelected={(num) => setSelected(num)}
                formState={formState}
              />
            )
        )}
    </Modal>
  );
};
